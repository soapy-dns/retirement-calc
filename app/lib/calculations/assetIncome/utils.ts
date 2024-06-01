import { AssetIncome } from "../assets/types"
import { BasicYearData } from "../types"

export const calculateTotalAssetIncome = (
  year: number,
  incomeFromAssets: AssetIncome[],
  totalIncome: BasicYearData[]
) => {
  const totalIncomeFromAssetsAmt = incomeFromAssets.reduce((accum, incomeDetails) => {
    const yearData = incomeDetails.history.find((it) => it.year === year)
    const incomeAmt = yearData?.value || 0
    return accum + incomeAmt
  }, 0)

  // CALCULATE INCOME FROM ASSETS
  totalIncome.push({
    year,
    value: Math.round(totalIncomeFromAssetsAmt)
  })

  return totalIncomeFromAssetsAmt
}
