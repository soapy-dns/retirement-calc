import { isEarnedIncomeAsset } from "@/app/ui/utils"
import { Asset } from "../assets/Asset"
import { InflationContext, YearData } from "../types"
import { getEarningsTaxCalculator } from "./taxCalcs/getTaxCalculator"
import { ContextConfig } from "../../data/schema/config"
import { BandedTaxCalc } from "./taxCalcs/BandedTaxCalc"
import { EarningsTax } from "../assets/types"

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
export const getEarningsTaxesOld = (assets: Asset[], context: ContextConfig, inflationContext: InflationContext) => {
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

export const calculateEarningsTaxes = (
  earningsTaxes: EarningsTax[], // for each owner
  assets: Asset[],
  year: number,
  taxCalculator?: BandedTaxCalc
) => {
  if (!taxCalculator) return

  const assetsWithEarnings = assets.filter((it) => isEarnedIncomeAsset(it.className))

  if (assetsWithEarnings.length === 0) return

  const accumulatedEarnings: Record<string, number> = assetsWithEarnings.reduce(
    (accum, asset) => {
      const assetYearData = asset.history.find((it) => it.year === year)

      const earningValue = assetYearData?.income || 0

      const owner: string = asset.assetOwners[0]
      accum[owner] = accum[owner] ? accum[owner] + earningValue : earningValue

      return accum
    },
    {} as Record<string, number>
  )

  // update earning tax
  Object.entries(accumulatedEarnings).forEach(([owner, earningAmt]) => {
    const earningsTaxAmt = taxCalculator.getTax(earningAmt, year)
    const ownersEarningTaxes = earningsTaxes.find((it) => it.owner === owner)
    const yearData = ownersEarningTaxes?.history.find((it) => it.year === year)
    if (yearData) {
      yearData.value = earningsTaxAmt
    }
  })

  // assetsWithEarnings.forEach((asset) => {
  //   const assetYearData = asset.history.find((it) => it.year === year)

  //   const owner = asset.assetOwners[0]
  //   const releventEarningsTax = earningsTaxes.find((it) => it.owner === owner)
  //   const earningsTaxYearData = releventEarningsTax?.history.find((it) => it.year === year)

  //   if (earningsTaxYearData && assetYearData) {
  //     earningsTaxYearData.value = earningsTaxYearData.value + assetYearData.value
  //   }
  // })

  // An earning asset can only have 1 owner
  // const owners = new Set<string>()
  // assetsWithEarnings.forEach((it) => it.assetOwners.forEach((owner) => owners.add(owner)))

  // owners.forEach((it) => {

  //   const totalEarningsForOwner = assetsWithEarnings.reduce((accum, asset) => {
  //     const assetYearData = asset.history.find((it) => it.year === year)

  //     // asset.assetOwners.includes(it) ? assetYearData?.income
  //   }, 0)
  // })

  // if (assetsWithEarnings.length === 0) return

  // const earningsTaxes = assetsWithEarnings.reduce(
  //   (accum, asset: Asset) => {
  //     const accumYearData = asset.history.find((it) => it.year === year)
  //     return accumYearData ? { year, value: taxCalculator.getTax(accumYearData.income, year) } : accum
  //   },
  //   { year: 0, value: 0 }
  // )

  // return earningsTaxes
}
