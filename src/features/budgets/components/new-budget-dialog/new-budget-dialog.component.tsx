"use client"
import {
  Button,
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  DialogTitle,
} from "@/components"
import { useTranslations } from "next-intl"
import React, { ReactNode, useState } from "react"
import { createBudgetAction } from "@/actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "@/i18n"

type NewBudgetDialogProps = {
  children: ReactNode
}

const NewBudgetDialog = ({ children }: NewBudgetDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations("app.budget.new-budget.dialog")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const formSchema = z.object({
    name: z.string().min(1, t("name.error")),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    const response = await createBudgetAction({
      name: values.name,
    })

    if (!!response.status) setIsLoading(false)

    if (response.status === "success" && response.data?.id) {
      form.reset()
      router.push(`/app/budgets/${response.data.id}`)
      setIsOpen(false)
    }
  }

  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
  } = form

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> {t("title")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name.label")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("name.placeholder")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex h-fit">
              <Button
                variant="secondary"
                onClick={() => {
                  setIsOpen(false)
                  form.reset()
                }}
              >
                {t("cancel-btn-label")}
              </Button>
              <Button type="submit" disabled={!isValid || !isDirty} loading={isLoading}>
                {t("submit-btn-label")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default NewBudgetDialog
