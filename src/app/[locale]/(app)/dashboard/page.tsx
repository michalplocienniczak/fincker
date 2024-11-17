import React from "react"
import { useTranslations } from "next-intl"
import { ThemeToggle } from "@/components"

const DashboardPage = () => {
  const t = useTranslations()
  return (
    <main>
      <h1>{t("DashboardPage.title")}</h1>
      <ThemeToggle />
    </main>
  )
}

export default DashboardPage
