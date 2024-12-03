import { SUBSCRIPTION_PLAN } from "@/enums/subscription-plan.enum"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatValueWithCurrency = (value: string | number, currencyCode: string) => {
  try {
    const formatter = new Intl.NumberFormat("en", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })

    const parts = formatter.formatToParts(1)
    const symbol = parts.find((part) => part.type === "currency")?.value

    const currencySymbol = symbol === "PLN" ? "zł" : symbol

    const currency = symbol === "PLN" ? `${value}${currencySymbol}` : `${currencySymbol}${value}`

    return currency || currencyCode
  } catch (error) {
    console.error("Invalid currency code:", currencyCode, error)
    return currencyCode
  }
}

export const parseLookupKeyToPlan = (lookupKey: string | null) => {
  if (lookupKey?.includes("fincker") && lookupKey.includes("lite")) {
    return [SUBSCRIPTION_PLAN.LITE]
  }
  if (lookupKey?.includes("fincker") && lookupKey.includes("premium")) {
    return [SUBSCRIPTION_PLAN.LITE, SUBSCRIPTION_PLAN.STANDARD, SUBSCRIPTION_PLAN.PREMIUM]
  }

  if (lookupKey?.includes("fincker")) {
    return [SUBSCRIPTION_PLAN.LITE, SUBSCRIPTION_PLAN.STANDARD]
  }

  return null
}
