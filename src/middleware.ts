import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

import { NextRequest } from "next/server"
import { LOCALES } from "./i18n"
import { auth } from "./auth"

const publicPages = ["/", "/login"]

const authMiddleware = auth((req) => {
  if (!req.auth) {
    const newUrl = new URL("/login", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }

  return createMiddleware(routing)(req)
})

const middleware = async (request: NextRequest, ctx: { params: { [key: string]: string } }) => {
  const publicPathnameRegex = RegExp(
    `^(/(${LOCALES.join("|")}))?(${publicPages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
    "i"
  )

  const isPublicPage = publicPathnameRegex.test(request.nextUrl.pathname)

  if (isPublicPage) {
    return createMiddleware(routing)(request)
  } else {
    return authMiddleware(request, ctx)
  }
}

export default middleware

export const config = {
  matcher: ["/", "/(pl|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
}
