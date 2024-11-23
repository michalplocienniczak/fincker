import { Header } from "@/features/landing"
import React from "react"

const LandingLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default LandingLayout
