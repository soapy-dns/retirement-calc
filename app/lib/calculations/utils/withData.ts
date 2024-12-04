import { AssetData } from "../types"

// if an AssetData contains no values, or all the values are 0, then don't remove them.  This hels prevent pollution of the spreadsheet
export const withData = (assetData: AssetData) => {
  return Object.entries(assetData).reduce((accum, [key, yearData]) => {
    const hasNonZeroValue = yearData.some((it) => it.value !== 0)
    if (hasNonZeroValue) return { ...accum, [key]: yearData }
    return accum
  }, {})
}
