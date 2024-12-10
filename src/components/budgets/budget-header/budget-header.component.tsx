import { Button } from "@/components"
import { DynamicBreadcrumbs } from "@/components/dynamic-breadcrumbs"
import { prisma } from "@/prisma"
import { getTranslations } from "next-intl/server"
import React from "react"
import { EditableTitle } from "./components"

type BudgetHeaderProps = {
  budgetId: string
}

const BudgetHeader = async ({ budgetId }: BudgetHeaderProps) => {
  const t = await getTranslations("breadcrumbs")

  const budget = await prisma.budget.findFirst({
    where: {
      id: Number(budgetId),
    },
  })

  const breadcrumbs = [
    {
      label: t("home"),
      href: "/app/",
    },
    {
      label: t("budgets"),
      href: "/app/budgets",
    },
    {
      label: budget?.name ?? "",
    },
  ]

  return (
    <header className="p-4 pb-2 flex flex-col gap-2 border-b-[1px] w-full">
      <DynamicBreadcrumbs breadcrumbs={breadcrumbs} />
      <div className="flex items-center justify-between">
        <EditableTitle name={budget?.name ?? ""} />
        <Button>Start new month</Button>
      </div>
    </header>
  )
}

export default BudgetHeader
