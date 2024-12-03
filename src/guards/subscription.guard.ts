"use server"

import { getSubscriptionByUserIdAction } from "@/actions"
import { auth } from "@/auth"
import { SUBSCRIPTION_PLAN } from "@/enums"
import { notFound } from "next/navigation"

export const subscriptionGuard = async (subscription: SUBSCRIPTION_PLAN) => {
  const session = await auth()

  if (!session) notFound()

  const subscriptionDetails = await getSubscriptionByUserIdAction(session.user.id)

  if (subscriptionDetails.status === "success" && !subscriptionDetails.data?.includes(subscription)) notFound()
}
