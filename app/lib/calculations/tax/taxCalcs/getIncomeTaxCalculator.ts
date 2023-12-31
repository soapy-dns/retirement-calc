import { AuIncomeTaxCalc } from "./AuIncomeTaxCalc"
import { IncomeTaxCalc } from "./incomeTaxCalc"
import { Country } from "./types"
import { UkIncomeTaxCalc } from "./UkIncomeTaxCalc"

export interface IGetIncomeTaxCalculator {
  taxResident: Country
  currency: Country
  au2ukExchangeRate?: number
  // income: number
}

// TODO: change name of currency
export const getIncomeTaxCalculator = ({
  taxResident,
  currency,
  au2ukExchangeRate = 1
}: // income
IGetIncomeTaxCalculator): IncomeTaxCalc => {
  const currencyConversionFactor = taxResident !== currency ? au2ukExchangeRate ?? 1 : 1

  if (taxResident === "AU") return new AuIncomeTaxCalc(currencyConversionFactor)

  return new UkIncomeTaxCalc(currencyConversionFactor)
}
