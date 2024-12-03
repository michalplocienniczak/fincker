import { getPriceByLookupKeyAction } from "@/actions"
import { auth } from "@/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components"
import { formatValueWithCurrency } from "@/lib"

import { getTranslations } from "next-intl/server"
import React from "react"
import { SubscribeButton } from "./components"

type SubscriptionPlanCardProps = {
  description: string
  type: "monthly" | "yearly"
  plan: "fincker" | "fincker-lite" | "fincker-premium"
}

const titles = {
  fincker: "Fincker",
  "fincker-lite": "Fincker Lite",
  "fincker-premium": "Fincker Premium",
}

const SubscriptionPlanCard = async ({ description, type, plan }: SubscriptionPlanCardProps) => {
  const price = await getPriceByLookupKeyAction(`${plan}-${type}`)
  const t = await getTranslations("landing.pricing-table.period")
  const session = await auth()

  if (price.status === "error" || !price.data) return null

  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>{titles[plan]}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 ">
        {!!price.data?.unit_amount && (
          <div>
            <span className="font-bold text-2xl">
              {formatValueWithCurrency(price.data.unit_amount / 100, price.data.currency)}
            </span>{" "}
            / {t(type)}
          </div>
        )}
        <SubscribeButton session={session} priceId={price.data?.id} />
      </CardContent>
    </Card>
  )
}

export default SubscriptionPlanCard
