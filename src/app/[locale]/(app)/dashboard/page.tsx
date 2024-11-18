import React from "react"
import { ThemeToggle } from "@/components"
import { getTranslations } from "next-intl/server"
import { auth } from "@/auth"

const DashboardPage = async () => {
  const t = await getTranslations()
  const session = await auth()

  return (
    <main>
      <h1>{t("DashboardPage.title")}</h1>
      <ThemeToggle />
      <code>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </code>
    </main>
  )
}

export default DashboardPage
