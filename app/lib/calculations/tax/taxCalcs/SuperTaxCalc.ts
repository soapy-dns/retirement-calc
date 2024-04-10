import config from "@/app/lib/calculations/config.json"
import { Country } from "@/app/lib/data/schema/config"

export const getSuperIncomeTax = (income: number, taxRegimeCountry: Country): number => {
  const { superIncomeTaxRate } = config[taxRegimeCountry]
  return income * superIncomeTaxRate
}
