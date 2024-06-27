import { InflationContext } from "../../types"
import { BandedTaxCalc } from "./BandedTaxCalc"
import { Country } from "./types"
import config from "@/app/lib/config.json"

export interface IGetTaxCalculator {
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
}: IGetTaxCalculator): BandedTaxCalc => {
  const currencyConversionFactor = taxResident !== currency ? au2ukExchangeRate ?? 1 : 1

  if (taxResident === "AU")
    return new BandedTaxCalc(currencyConversionFactor, config.incomeTax.AU.rates, inflationContext)

  return new BandedTaxCalc(currencyConversionFactor, config.incomeTax.SC.rates, inflationContext)
}

// eg National insurance in the uk
export const getEarningsTaxCalculator = ({
  taxResident,
  currency,
  inflationContext,
  au2ukExchangeRate = 1
}: IGetTaxCalculator): BandedTaxCalc | undefined => {
  const currencyConversionFactor = taxResident !== currency ? au2ukExchangeRate ?? 1 : 1
  if (taxResident === "AU") return

  return new BandedTaxCalc(currencyConversionFactor, config.earningsTax.SC.rates, inflationContext)
}

export const getEarningsTaxName = (taxResidentCountry: Country) => {
  return taxResidentCountry === "SC" ? config.earningsTax.SC.name : "Earnings Tax"
}
