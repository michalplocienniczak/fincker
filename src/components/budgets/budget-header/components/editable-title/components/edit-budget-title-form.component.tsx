"use client"
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from "@/components/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { SaveIcon, XIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

type EditBudgetTitleFormProps = {
  name: string
  onClose: () => void
}

const EditBudgetTitleForm = ({ name, onClose }: EditBudgetTitleFormProps) => {
  const tForm = useTranslations("app.budget.form")

  const formSchema = z.object({
    name: z.string().min(1, tForm("name.error")),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
  } = form

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          name="name"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder={tForm("name.placeholder")}
                  required
                  autoFocus
                  className="md:text-2xl p-0 ring-0 focus-visible:ring-0 border-0 shadow-none outline-none ring-offset-0 focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="icon" disabled={!isValid || !isDirty}>
          <SaveIcon />
        </Button>
        <Button onClick={onClose} variant="secondary">
          <XIcon />
        </Button>
      </form>
    </Form>
  )
}

export default EditBudgetTitleForm
