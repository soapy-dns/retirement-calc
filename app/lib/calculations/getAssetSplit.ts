import { isCapitalAsset } from "@/app/ui/utils"
import { Asset } from "./assets/Asset"
import { AssetSplitItem } from "./types"
import { getAssetSplitByYear } from "./assets/getAssetClasses"

export const getAssetSplit = (assets: Asset[], calcYearRangeAssets: number[]): Record<number, AssetSplitItem[]> => {
  const capitalAssets = assets.filter((it) => isCapitalAsset(it.className) === true)

  const assetSplitYearly: Record<number, AssetSplitItem[]> = calcYearRangeAssets.reduce(
    (accum, year) => {
      const assetSplit = getAssetSplitByYear(capitalAssets, year)
      accum[year] = assetSplit
      return accum
    },
    {} as Record<number, AssetSplitItem[]>
  )

  return assetSplitYearly
}
