export abstract class IncomeTaxCalc {
  protected currencyConversionFactor = 1

  constructor(factor: number) {
    this.currencyConversionFactor = factor
  }

  abstract getTax(income: number): number
}
