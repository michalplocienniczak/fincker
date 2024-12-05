import { defineRouting } from "next-intl/routing"
import { createNavigation } from "next-intl/navigation"
import { LOCALES } from "./consts"

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: "en",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/dashboard": "/dashboard",
    "/login": "/login",
    "/sign-out": "/sign-out",
  },
})

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
