import NextAuth from "next-auth"
import Resend from "next-auth/providers/resend"

import { prisma } from "@/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Resend({
      from: process.env.AUTH_EMAIL_FROM,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/sign-out",
  },
})
