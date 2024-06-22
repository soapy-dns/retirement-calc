import config from "@/app/lib/config.json"
import { Country } from "@/app/lib/data/schema/config"

// Note, this is not income tax as it get isn't banded - you pay a flat rate
export const getInvestmentTax = (income: number, taxRegimeCountry: Country): number => {
  const { superIncomeTaxRate } = config.superTax[taxRegimeCountry]
  return income * superIncomeTaxRate
}
