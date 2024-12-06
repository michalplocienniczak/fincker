import { defineRouting } from "next-intl/routing"
import { createNavigation } from "next-intl/navigation"
import { LOCALES } from "./consts"

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: "en",
  localePrefix: "always",
})

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
