import { BudgetHeader } from "@/components"
import React from "react"

const SingleBudgetLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: {
    budgetId: string
  }
}>) => {
  const { budgetId } = await params

  return (
    <>
      <BudgetHeader budgetId={budgetId} />
      {children}
    </>
  )
}

export default SingleBudgetLayout
