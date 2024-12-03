"use server"
import { signOut } from "@/auth"
import { ActionResponseType } from "@/types"

export const signOutAction = async (): Promise<ActionResponseType> => {
  await signOut({
    redirectTo: "/",
  })

  return {
    status: "success",
  }
}
