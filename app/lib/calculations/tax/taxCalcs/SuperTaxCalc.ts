import config from "@/app/lib/config.json"
import { Country } from "@/app/lib/data/schema/config"

export const getSuperIncomeTax = (income: number, taxRegimeCountry: Country): number => {
  const { superIncomeTaxRate } = config.superTax[taxRegimeCountry]
  return income * superIncomeTaxRate
}
