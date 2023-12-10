import { Asset } from "calculations/assets/Asset"
import { Earning } from "calculations/assets/types"
import { AssetData } from "data/types"
import { CellData } from "view/pages/sheets/row/types"
import { InflationContext } from "./types"

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

// export const getGraphIncomeData = (assets: Asset[], inflationContext: InflationContext) => {
//   const calculatedAssetNpvData = assets.reduce((accum: AssetData, asset) => {
//     if (asset.capitalAsset) {
//       const assetNpvHistory = asset.history.map((it) => {
//         const factor = inflationContext[it.year - 1] ? inflationContext[it.year - 1].factor : 1
//         return { year: it.year, value: Math.round(it.value / factor) }
//       })

//       accum[asset.name] = assetNpvHistory as CellData[] // TODO: why do we have CellData here
//       return accum
//     }

//     return accum
//   }, {})

//   return calculatedAssetNpvData
// }

export const getGraphIncomeNpvData = (earnings: Earning[], inflationContext: InflationContext) => {
  const graphData = earnings.reduce((accum: AssetData, asset) => {
    const assetNpvHistory = asset.history.map((it) => {
      const factor = inflationContext[it.year - 1] ? inflationContext[it.year - 1].factor : 1
      return { year: it.year, value: Math.round(it.value || 0 / factor) }
    })

    accum[asset.name] = assetNpvHistory as CellData[] // TODO: why do we have CellData here
    return accum
  }, {})
  // console.log("--graphData--", graphData)

  return graphData
}
