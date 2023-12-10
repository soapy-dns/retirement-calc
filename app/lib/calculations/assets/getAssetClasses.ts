import { Asset } from "./Asset"
import { AssetClass } from "@/app/lib/calculations/types"

export interface AssetSplitItem {
  assetClass: string
  fraction: number
}

export const getAssetSplit = (assets: Asset[]): AssetSplitItem[] => {
  const groupedAssets = Object.keys(AssetClass).map((assetClassKey) => {
    const assetClassAmt = assets.reduce((accum, asset) => {
      return asset.getAssetClass() === assetClassKey ? accum + asset.history[0].value : accum
    }, 0)

    return { assetClass: assetClassKey, value: assetClassAmt }
  })

  const totalAssetAmount = groupedAssets.reduce((accum, it) => it.value + accum, 0)

  const percGroupedAssets = groupedAssets.map((it) => {
    const fraction = it.value / totalAssetAmount
    return { assetClass: it.assetClass, fraction }
  })

  return percGroupedAssets
}
