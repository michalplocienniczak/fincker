import NextAuth, { User, type DefaultSession } from "next-auth"
import Resend from "next-auth/providers/resend"
import { JWT } from "next-auth/jwt"

import { prisma } from "@/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
  }
}

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
  callbacks: {
    jwt({ token, user }: { token: JWT; user: User }) {
      if (user && user.id) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if (token.id) {
        session.user.id = token.id
      }
      return session
    },
  },
})
