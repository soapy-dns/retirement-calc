import { ContextData } from "data/types"
import { AuIncomeTaxCalc } from "./auIncomeTaxCalc"
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
  console.log("--taxResident, currency, au2ukExchangeRate--", taxResident, currency, "-", au2ukExchangeRate)
  const factor = taxResident !== currency ? au2ukExchangeRate ?? 1 : 1

  console.log("--taxResident !== currency--", taxResident !== currency)
  console.log("--au2ukExchangeRate--", au2ukExchangeRate ?? 1)

  if (taxResident === "AU") return new AuIncomeTaxCalc(factor)
  return new UkIncomeTaxCalc(factor)
}
