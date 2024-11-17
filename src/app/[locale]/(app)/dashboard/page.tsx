import React from "react"
import { useTranslations } from "next-intl"

const DashboardPage = () => {
  const t = useTranslations()
  return <div>DashboardPage {t("DashboardPage.title")}</div>
}

export default DashboardPage
