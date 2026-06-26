import { isCapitalAsset } from "@/app/ui/utils"
import { Asset } from "../../assets/Asset"
import { AssetData, CapitalAssetGroup } from "../../types"

export const getGraphNpvByAssetClass = (assets: Asset[]): AssetData => {
  const groupKeys = Object.keys(CapitalAssetGroup)

  const initialAssetData = groupKeys.reduce((accum: AssetData, key) => {
    accum[key] = []
    return accum
  }, {} as AssetData)

  const assetsToProcess = assets.filter((it) => isCapitalAsset(it.className))

  return assetsToProcess.reduce((accum: AssetData, asset) => {
    if (!groupKeys.includes(asset.assetGroup)) {
      return accum
    }

    const yearDataList = accum[asset.assetGroup]
    asset.history.forEach((yearData) => {
      const existing = yearDataList.find((item) => item.year === yearData.year)
      if (existing) {
        existing.value += yearData.value
      } else {
        yearDataList.push({ year: yearData.year, value: yearData.value })
      }
    })

    return accum
  }, initialAssetData)
}
