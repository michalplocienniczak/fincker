"use client"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components"
import { NewBudgetDialog } from "@/features/budgets"
import { Link } from "@/i18n"
import { Budget } from "@prisma/client"
import { PlusIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import React from "react"

type BudgetSectionProps = {
  budgets: Budget[]
}

const BudgetSection = ({ budgets }: BudgetSectionProps) => {
  const params = useParams()
  const t = useTranslations("app.layout.sidebar.budgets")

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t("title")}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {budgets.map((budget) => (
            <SidebarMenuItem key={budget.id}>
              <SidebarMenuButton asChild isActive={params.budgetId === budget.id.toString()}>
                <Link href={`/app/budgets/${budget.id}`}>{budget.name}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <NewBudgetDialog>
              <SidebarMenuButton>
                <PlusIcon /> {t("new-budget-btn-label")}
              </SidebarMenuButton>
            </NewBudgetDialog>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export default BudgetSection
