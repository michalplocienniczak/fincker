"use server"
import { stripe } from "@/lib/stripe"
import { ActionResponseType } from "@/types"
import Stripe from "stripe"

export const getPriceByLookupKeyAction = async (lookupKey: string): Promise<ActionResponseType<Stripe.Price>> => {
  const price = await stripe.prices.list({
    lookup_keys: [lookupKey],
  })

  if (price.data.length === 0) {
    return {
      status: "error",
      error: "Price not found",
    }
  }

  return {
    status: "success",
    data: price.data[0],
  }
}
