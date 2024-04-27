import { isEarnedIncomeAsset } from "@/app/ui/utils"
import { Asset } from "../assets/Asset"
import { InflationContext, YearData } from "../types"
import { getEarningsTaxCalculator } from "./taxCalcs/getTaxCalculator"
import { ContextConfig } from "../../data/schema/config"

const getEarnings = (assetsWithEarnings: Asset[]) => {
  const earningsTaxes = assetsWithEarnings.reduce((accum, asset: Asset) => {
    asset.history.forEach((yearData) => {
      const accumYearData = accum.find((it) => yearData.year === it.year)
      if (accumYearData) {
        accumYearData.income = accumYearData.income + yearData.income
      } else {
        accum.push(yearData)
      }
    })
    return accum
  }, [] as YearData[])

  return earningsTaxes
}

// Earnings are income from work, not investment income or income from pensions
export const getEarningsTaxes = (assets: Asset[], context: ContextConfig, inflationContext: InflationContext) => {
  const assetsWithEarnings = assets.filter((it) => isEarnedIncomeAsset(it.className))
  if (assetsWithEarnings.length === 0) return
  const classNames = assetsWithEarnings.map((it) => it.className)

  const { taxResident, currency, au2ukExchangeRate } = context

  const taxCalculator = getEarningsTaxCalculator({ taxResident, currency, inflationContext, au2ukExchangeRate })

  if (!taxCalculator) return

  const earnings = getEarnings(assetsWithEarnings)

  const earningsTaxes = earnings.map((it) => {
    const { year } = it
    return { year, value: taxCalculator.getTax(it.income, year) }
  })

  return earningsTaxes
}
