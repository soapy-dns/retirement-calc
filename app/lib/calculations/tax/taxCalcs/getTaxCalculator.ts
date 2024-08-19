import { Country } from "@/app/lib/data/schema/config"
import { InflationContext } from "../../types"
import { BandedTaxCalc } from "./BandedTaxCalc"
// import { Country } from "./types"
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

  let rates
  switch (taxResident) {
    case "AU":
      rates = config.incomeTax.AU.rates
    case "EN":
      rates = config.incomeTax.EN.rates
    case "WA":
      rates = config.incomeTax.WA.rates
    case "NI":
      rates = config.incomeTax.NI.rates
    default:
      rates = config.incomeTax.SC.rates
  }

  return new BandedTaxCalc(currencyConversionFactor, rates, inflationContext)
}

// eg National insurance in the uk
export const getEarningsTaxCalculator = ({
  taxResident,
  currency,
  inflationContext,
  au2ukExchangeRate = 1
}: IGetTaxCalculator): BandedTaxCalc | undefined => {
  const currencyConversionFactor = taxResident !== currency ? au2ukExchangeRate ?? 1 : 1

  let rates
  switch (taxResident) {
    case "SC":
      rates = config.earningsTax.SC.rates
    case "EN":
      rates = config.earningsTax.EN.rates
    case "WA":
      rates = config.earningsTax.WA.rates
    case "NI":
      rates = config.earningsTax.NI.rates
  }

  if (rates) {
    return new BandedTaxCalc(currencyConversionFactor, rates, inflationContext)
  }
  return
}

export const getEarningsTaxName = (taxResidentCountry: Country) => {
  return taxResidentCountry === "SC" ? config.earningsTax.SC.name : "Earnings Tax"
}
