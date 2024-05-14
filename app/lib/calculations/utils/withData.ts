import { AssetData } from "../types"

export const withData = (assetData: AssetData) => {
  return Object.entries(assetData).reduce((accum, [key, yearData]) => {
    const hasNonZeroValue = yearData.some((it) => it.value !== 0)
    if (hasNonZeroValue) return { ...accum, [key]: yearData }
    return accum
  }, {})
}
