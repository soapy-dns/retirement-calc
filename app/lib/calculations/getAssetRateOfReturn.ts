import { isCapitalAsset, isIncomeProducingAsset } from "@/app/ui/utils"
import { Asset } from "./assets/Asset"
import { AssetIncome } from "./assets/types"
import { BasicYearData } from "./types"
import { log } from "console"


// TODO: don't think this gets used - get rid of it?- It doesn't work because there is no apparent return on super or property.
interface Props {
  incomeFromAssets: AssetIncome[]
  assets: Asset[]
  yearRange: number[]
}
export const getAssetRateOfReturn = ({ incomeFromAssets, assets, yearRange }: Props): BasicYearData[] => {
  const capitalAssets = assets.filter((asset) => isCapitalAsset(asset.className))
  const capitalAssetsWithIncome = incomeFromAssets.filter((asset) => isCapitalAsset(asset.className))

  const rateOfReturnData = yearRange.map((year) => {
    // const prevYear = year - 1

    const totalIncome = capitalAssetsWithIncome.reduce((accum, assetIncome) => {
      const incomeForYear = assetIncome.history.find((yearData) => yearData.year === year)?.value || 0
      return accum + incomeForYear
    }, 0) as number

    const totalValue = capitalAssets.reduce((accum, asset) => {
      const valueForYear = asset.history.find((yearData) => yearData.year === year)?.value || 0
      return accum + valueForYear
    }, 0) as number

    if (totalValue === 0 && totalIncome > 0) return { year, value: 0 } // TODO: this is a bit of a hack

    const rateOfReturn = totalIncome ? (totalIncome / totalValue) * 100 : 0
    log(`totalIncome: ${totalIncome}, totalValue: ${totalValue}, year: ${year}, rateOfReturn: ${rateOfReturn}`)

    return { year, value: rateOfReturn }
  })
  return rateOfReturnData
}
