import { isEarnedIncomeAsset } from "@/app/ui/utils"
import { Asset } from "../assets/Asset"
import { BandedTaxCalc } from "./taxCalcs/BandedTaxCalc"
import { EarningsTax } from "../assets/types"

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

      const owner: string = asset.ownerIds[0]
      accum[owner] = accum[owner] ? accum[owner] + earningValue : earningValue

      return accum
    },
    {} as Record<string, number>
  )

  // update earning tax
  Object.entries(accumulatedEarnings).forEach(([ownerId, earningAmt]) => {
    const { taxAmt: earningsTaxAmt } = taxCalculator.getTax(earningAmt, year)
    const ownersEarningTaxes = earningsTaxes.find((it) => it.ownerId === ownerId)
    const yearData = ownersEarningTaxes?.history.find((it) => it.year === year)
    if (yearData) {
      yearData.value = earningsTaxAmt
    }
  })
}
