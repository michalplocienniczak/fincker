import React from "react"
import { Outfit } from "next/font/google"
import { Link } from "@/i18n"

const outfit = Outfit({
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
})

const Logo = () => {
  return (
    <div className={`${outfit.className} text-2xl sm:text-4xl font-bold`}>
      <Link href="/">Fincker</Link>
    </div>
  )
}

export default Logo
