import React from "react"
import { SubscriptionPlanCard } from "./components"
import { Tabs, TabsContent, TabsTrigger } from "@/components"
import { TabsList } from "@radix-ui/react-tabs"
import { getTranslations } from "next-intl/server"

const PricingTable = async () => {
  const tabsContentClass = "flex gap-5 data-[state='inactive']:hidden"

  const t = await getTranslations("landing.pricing-table.tabs")

  return (
    <section>
      <Tabs defaultValue="monthly" className="flex flex-col gap-4 items-center">
        <TabsList className="bg-slate-50 p-1 rounded">
          <TabsTrigger value="monthly">{t("monthly")}</TabsTrigger>
          <TabsTrigger value="yearly">{t("yearly")}</TabsTrigger>
        </TabsList>
        <TabsContent value="monthly" className={tabsContentClass}>
          <SubscriptionPlanCard description="The best plan for individuals" plan="fincker-lite" type="monthly" />
          <SubscriptionPlanCard description="The best plan for individuals" plan="fincker" type="monthly" />
          <SubscriptionPlanCard description="The best plan for individuals" plan="fincker-premium" type="monthly" />
        </TabsContent>
        <TabsContent value="yearly" className={tabsContentClass}>
          <SubscriptionPlanCard description="The best plan for individuals" plan="fincker-lite" type="yearly" />
          <SubscriptionPlanCard description="The best plan for individuals" plan="fincker" type="yearly" />
          <SubscriptionPlanCard description="The best plan for individuals" plan="fincker-premium" type="yearly" />
        </TabsContent>
      </Tabs>
    </section>
  )
}
export default PricingTable
