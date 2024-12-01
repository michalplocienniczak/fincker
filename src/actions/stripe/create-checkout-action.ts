"use server"
import { auth } from "@/auth"
import { stripe } from "@/lib/stripe"
import { ActionResponseType } from "@/types"
import { z } from "zod"

type CreateCheckoutActionProps = {
  priceId: string
  userId: string
  email: string
  origin: string
}

type CreateCheckoutActionResponse = {
  sessionId: string
}

export const createCheckoutAction = async (
  payload: CreateCheckoutActionProps
): Promise<ActionResponseType<CreateCheckoutActionResponse>> => {
  const authSession = await auth()

  if (!authSession?.user) {
    return {
      status: "error",
      error: "Unauthorized",
    }
  }

  const formSchema = z.object({
    priceId: z.string().startsWith("price_"),
    userId: z.string(),
    email: z.string().email(),
    origin: z.string(),
  })

  const { priceId, userId, email, origin } = payload

  const validationResult = formSchema.safeParse(payload)

  if (!validationResult.success) {
    return {
      status: "error",
      error: "Invalid payload: " + validationResult.error.message,
    }
  }

  const session = await stripe.checkout.sessions.create({
    metadata: {
      user_id: userId,
    },
    customer_email: email,
    payment_method_types: ["card"],
    line_items: [
      {
        // base subscription
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${origin}/success`,
    cancel_url: `${origin}/cancel`,
  })

  return {
    status: "success",
    data: {
      sessionId: session.id,
    },
  }
}
