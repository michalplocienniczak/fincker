import { Logo, Badge } from "@/components"
import { getTranslations } from "next-intl/server"
import React from "react"
import { CallToAction, Navbar } from "./components"
import { MobileNavbar } from "./components/mobile-navbar"

const Header = async () => {
  const t = await getTranslations("landing.header")

  return (
    <header className="flex justify-between items-center px-4 py-2">
      <div className="flex gap-2 items-center">
        <Logo />
        <Badge className="h-fit bg-yellow-500">{t("demo-badge")}</Badge>
      </div>
      <Navbar />
      <div className="flex gap-2 items-center">
        <CallToAction />
        <MobileNavbar />
      </div>
    </header>
  )
}

export default Header
