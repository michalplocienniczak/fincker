"use client"
import { Button } from "@/components"
import { useTranslations } from "next-intl"
import React from "react"

const Navbar = () => {
  const t = useTranslations("landing.header.navbar")
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({
      behavior: "smooth",
    })
    window.location.hash = sectionId
  }

  return (
    <nav className="hidden md:block">
      <Button variant="ghost" onClick={() => scrollToSection("features")}>
        {t("features")}
      </Button>
      <Button variant="ghost" onClick={() => scrollToSection("pricing")}>
        {t("pricing")}
      </Button>
      <Button variant="ghost" onClick={() => scrollToSection("contact")}>
        {t("contact")}
      </Button>
    </nav>
  )
}

export default Navbar
