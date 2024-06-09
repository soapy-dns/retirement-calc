import { CellData } from "@/app/(frontend)/(withNavBar)/sheet/row/types"
import { Asset } from "../assets/Asset"
import { AssetIncome } from "../assets/types"
import { AssetData, InflationContext } from "../types"

// used by graph only
export const getCalculatedNpvData = (assets: Asset[], inflationContext: InflationContext) => {
  const calculatedAssetNpvData = assets.reduce((accum: AssetData, asset) => {
    if (asset.capitalAsset) {
      const assetNpvHistory = asset.history.map((it) => {
        const factor = inflationContext[it.year - 1] ? inflationContext[it.year - 1].factor : 1
        return { year: it.year, value: Math.round(it.value / factor) }
      })

      accum[asset.name] = assetNpvHistory as CellData[] // TODO: why do we have CellData here
      return accum
    }

    return accum
  }, {})

  return calculatedAssetNpvData
}

export const getGraphIncomeNpvData = (assetIncomes: AssetIncome[], inflationContext: InflationContext) => {
  const graphData = assetIncomes.reduce((accum: AssetData, asset) => {
    const assetNpvHistory = asset.history.map((it) => {
      const factor = inflationContext[it.year - 1] ? inflationContext[it.year - 1].factor : 1
      return { year: it.year, value: Math.round(it.value / factor) }
    })

    accum[asset.name] = assetNpvHistory as CellData[] // TODO: why do we have CellData here
    return accum
  }, {})

  return graphData
}
