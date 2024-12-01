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
