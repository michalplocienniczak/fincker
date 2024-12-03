import { auth } from "@/auth"
import { Button } from "@/components"
import { Link } from "@/i18n"
import { getTranslations } from "next-intl/server"
import React from "react"

const CallToAction = async () => {
  const session = await auth()
  const t = await getTranslations("landing.header.call-to-action")

  if (!!session?.user) {
    return (
      <Link href="/dashboard">
        <Button>{t("logged-in")}</Button>
      </Link>
    )
  }

  return (
    <Link href="/login">
      <Button>{t("not-logged-in")}</Button>
    </Link>
  )
}

export default CallToAction
