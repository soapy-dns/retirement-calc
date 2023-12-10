import { BasicYearData } from "calculations/types"
import { Earning } from "../assets/types"

export const calculateTotalEarnings = (year: number, earningsFromAssets: Earning[], totalEarnings: BasicYearData[]) => {
  const totalEarningsFromAssetsAmt = earningsFromAssets.reduce((accum, earnedDetails) => {
    const taxDetailsForYear = earnedDetails.history.find((it) => it.year === year)
    const earningsAmount = taxDetailsForYear?.value || 0
    return accum + earningsAmount
  }, 0)

  // CALCULATE EARNINGS FROM ASSETS
  totalEarnings.push({
    year,
    value: Math.round(totalEarningsFromAssetsAmt)
  })

  return totalEarningsFromAssetsAmt
}
