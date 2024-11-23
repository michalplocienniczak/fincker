import { Logo } from "@/components"
import { AuthFooter } from "@/features/auth"
import React, { type ReactNode } from "react"

const AuthLayout = ({
  children,
}: Readonly<{
  children: ReactNode
}>) => {
  return (
    <main className="w-screen min-h-screen h-fit flex flex-col items-center justify-between gap-8 py-5">
      <Logo />
      <section>{children}</section>
      <AuthFooter />
    </main>
  )
}

export default AuthLayout
