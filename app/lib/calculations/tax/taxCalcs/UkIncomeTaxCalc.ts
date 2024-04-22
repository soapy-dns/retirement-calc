import { getIncomeInTodaysMoney } from "../utils"
import { IncomeTaxCalc } from "./incomeTaxCalc"

export class UkIncomeTaxCalc extends IncomeTaxCalc {
  taxRate1 = 0
  taxRate2 = 0.19
  taxRate3 = 0.2
  taxRate4 = 0.21
  taxRate5 = 0.42
  taxRate6 = 0.45
  taxRate7 = 0.48

  bandTop1 = 12570
  bandTop2 = 14876
  bandTop3 = 26561
  bandTop4 = 43662
  bandTop5 = 75000
  bandTop6 = 125140

  taxTo1 = 0
  taxTo2 = (this.bandTop2 - this.bandTop1) * this.taxRate2
  taxTo3 = (this.bandTop3 - this.bandTop2) * this.taxRate3 + this.taxTo2
  taxTo4 = (this.bandTop4 - this.bandTop3) * this.taxRate4 + this.taxTo3
  taxTo5 = (this.bandTop5 - this.bandTop4) * this.taxRate4 + this.taxTo4
  taxTo6 = (this.bandTop6 - this.bandTop5) * this.taxRate5 + this.taxTo5

  getTax(income: number, year: number): number {
    const { incomeInTodaysMoney, inflationFactor } = getIncomeInTodaysMoney(
      income,
      year,
      this.currencyConversionFactor,
      this.inflationContext
    )

    let taxAmtInTodaysMoney
    switch (true) {
      case incomeInTodaysMoney > this.bandTop6:
        taxAmtInTodaysMoney = (incomeInTodaysMoney - this.bandTop6) * this.taxRate7 + this.taxTo6
        break
      case incomeInTodaysMoney > this.bandTop5:
        taxAmtInTodaysMoney = (incomeInTodaysMoney - this.bandTop5) * this.taxRate6 + this.taxTo5
        break
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
