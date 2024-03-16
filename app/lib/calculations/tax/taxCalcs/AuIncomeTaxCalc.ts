import { getIncomeInTodaysMoney } from "../utils"
import { IncomeTaxCalc } from "./incomeTaxCalc"

export class AuIncomeTaxCalc extends IncomeTaxCalc {
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

  getTax(income: number, year: number): number {
    const { incomeInTodaysMoney, inflationFactor } = getIncomeInTodaysMoney(
      income,
      year,
      this.currencyConversionFactor,
      this.inflationContext
    )

    let taxAmtInTodaysMoney
    switch (true) {
      case incomeInTodaysMoney > this.bandTop4:
        taxAmtInTodaysMoney = (incomeInTodaysMoney - this.bandTop4) * this.taxRate5 + this.taxTo4
        break

      case incomeInTodaysMoney > this.bandTop3:
        taxAmtInTodaysMoney = (incomeInTodaysMoney - this.bandTop3) * this.taxRate4 + this.taxTo3
        break
      case incomeInTodaysMoney > this.bandTop2:
        taxAmtInTodaysMoney = (incomeInTodaysMoney - this.bandTop2) * this.taxRate3 + this.taxTo2
        break
      case incomeInTodaysMoney > this.bandTop1:
        taxAmtInTodaysMoney = (incomeInTodaysMoney - this.bandTop1) * this.taxRate2 + this.taxTo1
        break

      default:
        taxAmtInTodaysMoney = incomeInTodaysMoney * this.taxRate1
    }

    const taxAmtInYearsMoneyAndOriginalCurrency =
      (taxAmtInTodaysMoney * inflationFactor) / this.currencyConversionFactor

    return Math.round(taxAmtInYearsMoneyAndOriginalCurrency)
  }
}
