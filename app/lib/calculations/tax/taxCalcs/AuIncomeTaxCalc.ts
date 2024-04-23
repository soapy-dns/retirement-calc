import { getIncomeInTodaysMoney } from "../utils"
import { IncomeTaxCalc } from "./incomeTaxCalc"
import config from "@/app/lib/config.json"

interface TaxRecord {
  rate: number
  bandTop: number
}
const taxConfig: TaxRecord[] = config.incomeTax.AU

interface AdditionalTaxRecord extends TaxRecord {
  additionalAmt: number
}
const additionalTaxes: AdditionalTaxRecord[] = taxConfig.map((it, index) => {
  const prevBandTop = taxConfig[index - 1] ? taxConfig[index - 1].bandTop : 0
  return { ...it, additionalAmt: (it.bandTop - prevBandTop) * it.rate }
})

interface TaxToRecord extends AdditionalTaxRecord {
  taxToTop: number
}

const sumTaxesTo = (additionalTaxes: AdditionalTaxRecord[], index: number) => {
  const additionalTaxesToSum = [...additionalTaxes].splice(0, index)

  const taxAmt = additionalTaxesToSum.reduce((accum, it) => {
    return accum + it.additionalAmt
  }, 0)

  return taxAmt
}

const taxTo: TaxToRecord[] = additionalTaxes.map((it, index) => {
  const prevTaxAmt = sumTaxesTo(additionalTaxes, index)
  return { ...it, taxToTop: prevTaxAmt + it.additionalAmt }
})

export class AuIncomeTaxCalc extends IncomeTaxCalc {
  getTax(income: number, year: number): number {
    const { incomeInTodaysMoney, inflationFactor } = getIncomeInTodaysMoney(
      income,
      year,
      this.currencyConversionFactor,
      this.inflationContext
    )

    const lastIndex = taxTo.findIndex((it) => incomeInTodaysMoney < it.bandTop)

    let taxAmtInTodaysMoney
    if (lastIndex === 0) {
      taxAmtInTodaysMoney = incomeInTodaysMoney * taxTo[0].rate
    } else {
      taxAmtInTodaysMoney =
        taxTo[lastIndex - 1].taxToTop + (incomeInTodaysMoney - taxTo[lastIndex - 1].bandTop) * taxTo[lastIndex].rate
    }

    const taxAmtInYearsMoneyAndOriginalCurrency =
      (taxAmtInTodaysMoney * inflationFactor) / this.currencyConversionFactor

    return Math.round(taxAmtInYearsMoneyAndOriginalCurrency)
  }
}
