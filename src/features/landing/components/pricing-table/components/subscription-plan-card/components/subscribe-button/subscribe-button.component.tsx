"use client"
import { createCheckoutAction } from "@/actions"
import { Button } from "@/components"
import { Link } from "@/i18n"
import { stripeClient } from "@/lib"
import { Session } from "next-auth"
import { useTranslations } from "next-intl"
import React, { useTransition } from "react"

type SubscribeButtonProps = {
  session: Session | null
  priceId: string
}

const SubscribeButton = ({ session, priceId }: SubscribeButtonProps) => {
  const [isPending, startTansition] = useTransition()
  const t = useTranslations("landing.pricing-table.subscribe-button")

  const handleSubscribe = () => {
    startTansition(async () => {
      if (session?.user?.id && session?.user?.email && typeof window !== "undefined") {
        const response = await createCheckoutAction({
          priceId,
          userId: session?.user?.id,
          email: session?.user?.email,
          origin: window.location.origin,
        })

        if (response.status === "success") {
          if (response.data?.sessionId) {
            const stripe = await stripeClient
            await stripe?.redirectToCheckout({ sessionId: response.data?.sessionId })
          }
        }
      }
    })
  }

  if (!!session?.user) {
    return (
      <Button onClick={handleSubscribe} loading={isPending}>
        {t("btn-label.subscribe")}
      </Button>
    )
  }

  return (
    <Link href="/login">
      <Button>{t("btn-label.get-started")}</Button>
    </Link>
  )
}

export default SubscribeButton
