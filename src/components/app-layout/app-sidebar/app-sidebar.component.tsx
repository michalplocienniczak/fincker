import { Logo, Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components"
import React from "react"
import { BudgetSection, UserInformationDropdown } from "./components"
import { auth } from "@/auth"
import { prisma } from "@/prisma"

const AppSidebar = async () => {
  const session = await auth()

  const latestBudgets = await prisma.budget.findMany({
    where: {
      userId: session?.user.id,
    },
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <Sidebar>
      <SidebarHeader className="m-2">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <BudgetSection budgets={latestBudgets} />
      </SidebarContent>
      <SidebarFooter>
        <UserInformationDropdown session={session} />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
