import { SUBSCRIPTION_PLAN } from "@/types"
import en from "./messages/en.json"
import { DefaultSession } from "next-auth"
import "next-auth"
import "next-auth/jwt"

type Messages = typeof en

declare global {
  // Use type safe message keys with `next-intl`
  type IntlMessages = Messages
}
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      plan: SUBSCRIPTION_PLAN[] | null
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
  }
}
