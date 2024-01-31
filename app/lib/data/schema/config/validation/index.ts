import { getStartingYear } from "@/app/lib/calculations/utils/getStartingYear"
import { IAsset, InflationRecord, LivingExpensesRecord } from ".."

// VALIDATE CONTEXT
export const validateLivingExpensesVsInflation = (
  livingExpenses: LivingExpensesRecord[],
  inflation: InflationRecord[]
) => {
  // return false
  // TODO: sort - just getting the 1st for simplicity
  return livingExpenses[0].fromYear >= inflation[0].fromYear
}

// VALIDATE ASSETS
export const validateEarningsBucket = (assets: IAsset[]) => {
  // return false
  const earningsBucketAssets = assets.filter((it) => it.incomeBucket === true)

  return earningsBucketAssets.length === 1
}

// VALIDATE TRANSFERS
export const yearNotPassed = (year: number) => {
  // return false
  const nowYear = getStartingYear()

  return nowYear <= year
}
