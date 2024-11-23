"use client"
import { Button, Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components"
import { Menu } from "lucide-react"
import { useTranslations } from "next-intl"
import React, { useState } from "react"

const MobileNavbar = () => {
  const t = useTranslations("landing.header.navbar")
  const [open, setOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    setOpen(false)
    setTimeout(() => {
      element?.scrollIntoView({
        behavior: "smooth",
      })
    }, 100)
    window.location.hash = sectionId
  }

  return (
    <div className="md:hidden">
      <Drawer open={open} onOpenChange={(open) => setOpen(open)}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle className="text-center py-3">{t("title")}</DrawerTitle>
          <Button variant="ghost" onClick={() => scrollToSection("features")}>
            {t("features")}
          </Button>
          <Button variant="ghost" onClick={() => scrollToSection("pricing")}>
            {t("pricing")}
          </Button>
          <Button variant="ghost" onClick={() => scrollToSection("contact")}>
            {t("contact")}
          </Button>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default MobileNavbar
