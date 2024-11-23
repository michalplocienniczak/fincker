"use server"
import { z } from "zod"
import { signIn } from "@/auth"
import { getTranslations } from "next-intl/server"
import { ActionResponseType } from "@/types"

export const loginAction = async (email: string): Promise<ActionResponseType> => {
  const t = await getTranslations("auth.login.email")

  const actionSchema = z.object({
    email: z.string().email(t("error")),
  })

  try {
    const validationResult = actionSchema.safeParse({
      email,
    })

    if (!validationResult.success) {
      throw new Error(validationResult.error.errors[0].message)
    }

    await signIn("resend", {
      email,
      redirect: false,
      redirectTo: "/dashboard",
    })

    return {
      status: "success",
    }
  } catch (error: unknown) {
    return {
      status: "error",
      error: error,
    }
  }
}
