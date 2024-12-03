import { stripe } from "@/lib/stripe"
import { prisma } from "@/prisma"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get("stripe-signature")

    let event

    try {
      event = stripe.webhooks.constructEvent(rawBody, signature!, process.env.STRIPE_WEBHOOK_SECRET!)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch {
      return NextResponse.json({ message: "Webhook Error" }, { status: 400 })
    }

    if (event.type === "checkout.session.completed") {
      const session: Stripe.Checkout.Session = event.data.object
      const userId = session.metadata?.user_id

      await prisma.stripeSubscription.upsert({
        where: {
          userId: userId!,
        },
        update: {
          subscriptionId: session.subscription as string,
          stripeCustomerId: session.customer as string,
          isPlanActive: true,
          planExpiresAt: null,
        },
        create: {
          userId: userId!,
          subscriptionId: session.subscription as string,
          stripeCustomerId: session.customer as string,
          isPlanActive: true,
          planExpiresAt: null,
        },
      })
    }
    if (event.type === "customer.subscription.updated") {
      const subscription: Stripe.Subscription = event.data.object

      await prisma.stripeSubscription.update({
        where: {
          userId: subscription.metadata?.user_id as string,
        },
        data: {
          planExpiresAt: subscription.cancel_at,
        },
      })
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object

      await prisma.stripeSubscription.update({
        where: {
          userId: subscription.metadata?.user_id as string,
        },
        data: {
          isPlanActive: false,
          subscriptionId: null,
        },
      })
    }

    return NextResponse.json({ message: "success" })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
