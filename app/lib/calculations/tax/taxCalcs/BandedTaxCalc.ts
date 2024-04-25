import { InflationContext } from "../../types"
import { getIncomeInTodaysMoney } from "../utils"
interface TaxRecord {
  rate: number
  bandTop: number
}

interface AdditionalTaxRecord extends TaxRecord {
  additionalAmt: number
}

interface TaxToRecord extends AdditionalTaxRecord {
  taxToTop: number
}
export class BandedTaxCalc {
  protected currencyConversionFactor = 1
  protected inflationContext
  protected taxToConfig: TaxToRecord[]

  constructor(currencyConversionFactor: number, taxConfig: TaxRecord[], inflationContext?: InflationContext) {
    this.currencyConversionFactor = currencyConversionFactor
    this.inflationContext = inflationContext
    const taxToConfig = this.initialize(taxConfig)
    this.taxToConfig = taxToConfig
  }

  initialize(taxConfig: TaxRecord[]) {
    const additionalTaxes: AdditionalTaxRecord[] = taxConfig.map((it, index) => {
      const prevBandTop = taxConfig[index - 1] ? taxConfig[index - 1].bandTop : 0
      return { ...it, additionalAmt: (it.bandTop - prevBandTop) * it.rate }
    })

    const sumTaxesTo = (additionalTaxes: AdditionalTaxRecord[], index: number) => {
      const additionalTaxesToSum = [...additionalTaxes].splice(0, index)

      const taxAmt = additionalTaxesToSum.reduce((accum, it) => {
        return accum + it.additionalAmt
      }, 0)

      return taxAmt
    }

    const taxToConfig = additionalTaxes.map((it, index) => {
      const prevTaxAmt = sumTaxesTo(additionalTaxes, index)
      return { ...it, taxToTop: prevTaxAmt + it.additionalAmt }
    })

    return taxToConfig
  }

  getTax(income: number, year: number): number {
    const { incomeInTodaysMoney, inflationFactor } = getIncomeInTodaysMoney(
      income,
      year,
      this.currencyConversionFactor,
      this.inflationContext
    )

    const lastIndex = this.taxToConfig.findIndex((it) => incomeInTodaysMoney < it.bandTop)

    let taxAmtInTodaysMoney
    if (lastIndex === 0) {
      taxAmtInTodaysMoney = incomeInTodaysMoney * this.taxToConfig[0].rate
    } else {
      taxAmtInTodaysMoney =
        this.taxToConfig[lastIndex - 1].taxToTop +
        (incomeInTodaysMoney - this.taxToConfig[lastIndex - 1].bandTop) * this.taxToConfig[lastIndex].rate
    }

    const taxAmtInYearsMoneyAndOriginalCurrency =
      (taxAmtInTodaysMoney * inflationFactor) / this.currencyConversionFactor

    return Math.round(taxAmtInYearsMoneyAndOriginalCurrency)
  }
}
