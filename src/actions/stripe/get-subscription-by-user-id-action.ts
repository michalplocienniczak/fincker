"use server"
import { parseLookupKeyToPlan } from "@/lib"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/prisma"
import type { ActionResponseType } from "@/types"
import { SUBSCRIPTION_PLAN } from "@/enums"

export const getSubscriptionByUserIdAction = async (
  userId: string
): Promise<ActionResponseType<SUBSCRIPTION_PLAN[] | null>> => {
  const subscriptionDetails = await prisma.stripeSubscription.findFirst({
    where: {
      userId: userId,
    },
  })

  if (!subscriptionDetails) {
    return {
      status: "error",
      error: "Subscription not found",
    }
  }

  if (!subscriptionDetails.isPlanActive || !subscriptionDetails.subscriptionId) {
    return {
      status: "error",
      error: "Subscription is not active",
    }
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionDetails.subscriptionId)

  return {
    status: "success",
    data: parseLookupKeyToPlan(subscription.items.data[0].price.lookup_key),
  }
}
