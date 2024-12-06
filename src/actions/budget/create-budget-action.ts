"use server"

import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { ActionResponseType } from "@/types"
import { Budget } from "@prisma/client"
import { z } from "zod"

type CreateBudgetActionProps = {
  name: string
}

export const createBudgetAction = async ({ name }: CreateBudgetActionProps): Promise<ActionResponseType<Budget>> => {
  const session = await auth()

  if (!session?.user) {
    return {
      status: "error",
      error: "User is not authenticated",
    }
  }

  const validationSchema = z.object({
    name: z.string().min(1, "Name is required"),
  })

  const validationResult = validationSchema.safeParse({ name })

  if (!validationResult.success) {
    return {
      status: "error",
      error: validationResult.error.errors[0].message,
    }
  }

  const budget = await prisma.budget.create({
    data: {
      name,
      userId: session.user.id,
    },
  })

  return {
    status: "success",
    data: budget,
  }
}
