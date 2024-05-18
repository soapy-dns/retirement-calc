import { isCapitalAsset } from "@/app/ui/utils"
import { Asset } from "./Asset"
import { AssetGroup, CapitalAssetGroup } from "@/app/lib/calculations/types"

export interface AssetSplitItem {
  assetClass: string
  fraction: number
}

export const getAssetSplitByYear = (assets: Asset[], year: number): AssetSplitItem[] => {
  const capitalAssets = assets.filter((it) => isCapitalAsset(it.className))

  const groupedAssets = Object.keys(CapitalAssetGroup).map((assetClassKey) => {
    const assetClassAmt = capitalAssets.reduce((accum, asset) => {
      const yearData = asset.history.find((it) => it.year === year)
      if (!yearData) return accum

      return asset.getAssetClass() === assetClassKey ? accum + yearData.value : accum
    }, 0)

    return { assetClass: assetClassKey, value: assetClassAmt }
  })

  const totalAssetAmount = groupedAssets.reduce((accum, it) => it.value + accum, 0)

  const percGroupedAssets = groupedAssets.map((it) => {
    const fraction = (it.value * 100) / totalAssetAmount
    return { assetClass: it.assetClass, fraction }
  })

  return percGroupedAssets
}
