import { IncomeTaxCalc } from "./incomeTaxCalc"

export class AuIncomeTaxCalc extends IncomeTaxCalc {
  // constructor(factor: number) {
  //   super(factor)
  // }

  taxRate1 = 0
  taxRate2 = 0.19
  taxRate3 = 0.325
  taxRate4 = 0.37
  taxRate5 = 0.45

  bandTop1 = 18200
  bandTop2 = 45000
  bandTop3 = 120000
  bandTop4 = 180000

  taxTo1 = 0
  taxTo2 = (this.bandTop2 - this.bandTop1) * this.taxRate2
  taxTo3 = (this.bandTop3 - this.bandTop2) * this.taxRate3 + this.taxTo2
  taxTo4 = (this.bandTop4 - this.bandTop3) * this.taxRate4 + this.taxTo3

  getTax(income: number): number {
    const correctedIncome = income * this.factor
    if (correctedIncome > this.bandTop4)
      return Math.round((correctedIncome - this.bandTop4) * this.taxRate5 + this.taxTo4)
    if (correctedIncome > this.bandTop3)
      return Math.round((correctedIncome - this.bandTop3) * this.taxRate4 + this.taxTo3)
    if (correctedIncome > this.bandTop2)
      return Math.round((correctedIncome - this.bandTop2) * this.taxRate3 + this.taxTo2)
    if (correctedIncome > this.bandTop1)
      return Math.round((correctedIncome - this.bandTop1) * this.taxRate2 + this.taxTo1)

    return Math.round(correctedIncome * this.taxRate1)
  }
}
