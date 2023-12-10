export abstract class IncomeTaxCalc {
  protected factor = 1

  constructor(factor: number) {
    this.factor = factor
  }

  abstract getTax(income: number): number
}
