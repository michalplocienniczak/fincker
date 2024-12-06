import { prisma } from "@/prisma"
import React from "react"

const BudgetPage = async ({ params }: { params: Promise<{ budgetId: string }> }) => {
  const searchParams = await params

  const budget = await prisma.budget.findFirst({
    where: {
      id: {
        equals: +searchParams.budgetId,
      },
    },
  })

  return (
    <div>
      BudgetPage
      <code>
        <pre>{JSON.stringify(budget, null, 2)}</pre>
      </code>
    </div>
  )
}

export default BudgetPage
