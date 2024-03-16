import { InflationContext } from "../../types"

export abstract class IncomeTaxCalc {
  protected currencyConversionFactor = 1
  protected inflationContext

  constructor(currencyConversionFactor: number, inflationContext?: InflationContext) {
    this.currencyConversionFactor = currencyConversionFactor
    this.inflationContext = inflationContext
  }

  abstract getTax(income: number, year: number): number
}
