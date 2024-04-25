import { InflationContext } from "../../types"
import { BandedTaxCalc } from "./BandedTaxCalc"
import { Country } from "./types"
import config from "@/app/lib/config.json"

export interface IGetIncomeTaxCalculator {
  taxResident: Country
  currency: Country
  inflationContext?: InflationContext
  au2ukExchangeRate?: number
  // income: number
}

// TODO: change name of currency
export const getIncomeTaxCalculator = ({
  taxResident,
  currency,
  inflationContext,
  au2ukExchangeRate = 1
}: // income
IGetIncomeTaxCalculator): BandedTaxCalc => {
  const currencyConversionFactor = taxResident !== currency ? au2ukExchangeRate ?? 1 : 1

  if (taxResident === "AU") return new BandedTaxCalc(currencyConversionFactor, config.incomeTax.AU, inflationContext)

  return new BandedTaxCalc(currencyConversionFactor, config.incomeTax.SC, inflationContext)
}
