"use client"
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  AlertTitle,
  Alert,
  AlertDescription,
} from "@/components"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { loginAction } from "@/actions"

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false)
  const t = useTranslations("auth.login")

  const formSchema = z.object({
    email: z.string().email(t("email.error")),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    const response = await loginAction(values.email)

    if (response.status === "error" && typeof response.error === "string") {
      form.setError("email", {
        type: "manual",
        message: response.error,
      })
      setIsLoading(false)
    }
    if (response.status === "success") {
      form.reset()
      setIsSuccessMessageVisible(true)
      setIsLoading(false)
    }
  }

  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
  } = form

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {isSuccessMessageVisible && (
              <Alert>
                <AlertTitle>{t("success.title")}</AlertTitle>
                <AlertDescription>{t("success.description")}</AlertDescription>
              </Alert>
            )}
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email.label")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("email.placeholder")} />
                  </FormControl>
                  <FormDescription>{t("email.description")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!isValid || !isDirty} loading={isLoading}>
              {t("submit-btn-label")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default LoginForm
