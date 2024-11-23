"use server"
import { signOut } from "@/auth"
import { ActionResponseType } from "@/types"

export const signOutAction = async (): Promise<ActionResponseType> => {
  try {
    await signOut({
      redirectTo: "/",
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
