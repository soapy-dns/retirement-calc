import { Asset } from "../assets/Asset"

export const getValueOfAssetAtYear = (asset: Asset, year: number): number => {
  const matchingYearData = asset?.history.find((yearData) => yearData.year === year)
  const value = matchingYearData?.value ?? 0

  return value
}