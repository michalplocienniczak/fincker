"use client"
import { signOutAction } from "@/actions"
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components"
import { useRouter } from "@/i18n"
import { useTranslations } from "next-intl"
import React, { useState } from "react"

const SignOutCard = () => {
  const [isLoading, setIsLoading] = useState(false)
  const t = useTranslations("auth.signout")

  const router = useRouter()

  const handleSignout = async () => {
    setIsLoading(true)
    const response = await signOutAction()
    if (!!response.status) {
      setIsLoading(false)
      router.push("/")
    }
  }

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleSignout} disabled={isLoading}>
          {t("submit-btn-label")}
        </Button>
      </CardContent>
    </Card>
  )
}

export default SignOutCard
