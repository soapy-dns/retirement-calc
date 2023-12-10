import { IncomeTaxCalc } from "./incomeTaxCalc"

export class UkIncomeTaxCalc extends IncomeTaxCalc {
  taxRate1 = 0
  taxRate2 = 0.19
  taxRate3 = 0.2
  taxRate4 = 0.21
  taxRate5 = 0.42
  taxRate6 = 0.47

  bandTop1 = 12570
  bandTop2 = 14732
  bandTop3 = 25688
  bandTop4 = 43663
  bandTop5 = 125140

  taxTo1 = 0
  taxTo2 = (this.bandTop2 - this.bandTop1) * this.taxRate2
  taxTo3 = (this.bandTop3 - this.bandTop2) * this.taxRate3 + this.taxTo2
  taxTo4 = (this.bandTop4 - this.bandTop3) * this.taxRate4 + this.taxTo3
  taxTo5 = (this.bandTop5 - this.bandTop4) * this.taxRate4 + this.taxTo4

  getTax(income: number): number {
    const correctedIncome = income * this.factor

    if (correctedIncome > this.bandTop5)
      return Math.round((correctedIncome - this.bandTop5) * this.taxRate6 + this.taxTo5)
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
