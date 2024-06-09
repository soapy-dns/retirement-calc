import { Country } from "@/app/lib/data/schema/config"

export const taxResidentOptions: { value: Country; label: string }[] = [
  { value: "AU", label: "Australia" },
  { value: "SC", label: "Scotland" }
]

export const currencyOptions: { value: Country; label: string }[] = [
  { value: "AU", label: "AUD" },
  { value: "SC", label: "GBP" }
]
