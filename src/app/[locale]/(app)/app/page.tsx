import React from "react"
import { ThemeToggle } from "@/components"
import { getTranslations } from "next-intl/server"
import { auth } from "@/auth"

const DashboardPage = async () => {
  const t = await getTranslations("dashboard-page")
  const session = await auth()

  return (
    <main>
      <h1>{t("title")}</h1>
      <ThemeToggle />
      <code>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </code>
    </main>
  )
}

export default DashboardPage
