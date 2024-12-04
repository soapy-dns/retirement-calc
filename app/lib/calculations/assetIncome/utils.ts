import { OwnerType } from "../../data/schema/config"
import { AssetIncome } from "../assets/types"
import { BasicYearData } from "../types"

export const calculateTotalAssetIncomeAmt = (year: number, incomeFromAssets: AssetIncome[]): number => {
  const totalIncomeFromAssetsAmt = incomeFromAssets.reduce((accum, incomeDetails) => {
    const yearData = incomeDetails.history.find((it) => it.year === year)
    const incomeAmt = yearData?.value || 0
    return accum + incomeAmt
  }, 0)

  return totalIncomeFromAssetsAmt
}

export const getAssetIncomeAmtForOwner = (year: number, incomeFromAssets: AssetIncome[], owner: OwnerType): number => {
  const ownerIncomeFromAssets = incomeFromAssets.filter((it) => it.ownerId === owner.identifier)
  const totalIncomeFromAssetsAmt = incomeFromAssets.reduce((accum, incomeDetails) => {
    const yearData = incomeDetails.history.find((it) => it.year === year)
    const incomeAmt = yearData?.value || 0
    return accum + incomeAmt
  }, 0)

  return totalIncomeFromAssetsAmt
}

// export const calculateTotalAssetIncome = (
//   year: number,
//   incomeFromAssets: AssetIncome[],
//   owners: OwnerType[]
// ): BasicYearData[] => {

//   owners.map((owner) => {
//     const ownerIncomeFromAssets = incomeFromAssets.filter((it) => it.ownerId === owner.identifier)
//     ownerIncomeFromAssets.map((it) => {
//       const yearData = it.history.find((it) => it.year === year)
//       if (!yearData) {
//         it.history.push({
//           year,
//           value: 0
//         })
//       }
//     }

//   }
//   const totalIncomeFromAssetsAmt = incomeFromAssets.reduce((accum, incomeDetails) => {
//     const yearData = incomeDetails.history.find((it) => it.year === year)
//     const incomeAmt = yearData?.value || 0
//     return accum + incomeAmt
//   }, 0)

//   // CALCULATE INCOME FROM ASSETS
//   totalIncomeFromAssets.push({
//     year,
//     value: Math.round(totalIncomeFromAssetsAmt)
//   })

//   return totalIncomeFromAssets
// }
