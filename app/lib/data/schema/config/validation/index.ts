import { getStartingYear } from "@/app/lib/calculations/utils/getStartingYear"
import { IAsset, InflationRecord, LivingExpensesRecord } from ".."

// VALIDATE CONTEXT
export const validateLivingExpensesVsInflation = (
  livingExpenses: LivingExpensesRecord[],
  inflation: InflationRecord[]
) => {
  // TODO: sort - just getting the 1st for simplicity
  if (livingExpenses[0]) {
    const startYear = getStartingYear()

    return livingExpenses[0].fromYear || startYear >= inflation[0].fromYear
  }
}

// VALIDATE ASSETS
export const validateEarningsBucket = (assets: IAsset[]) => {
  // return false
  const earningsBucketAssets = assets.filter((it) => it.incomeBucket === true)

  return earningsBucketAssets.length === 1
}

// VALIDATE TRANSFERS
export const yearNotPassed = (year: number) => {
  const nowYear = getStartingYear()

  return nowYear <= year
}

type Props = { incomeStartYear?: number; incomeEndYear?: number }

export const incomeValidator = {
  validator: ({ incomeStartYear, incomeEndYear }: Props) => {
    if (!incomeStartYear || !incomeEndYear) return true
    return incomeStartYear < incomeEndYear
  },
  options: ({ incomeStartYear, incomeEndYear }: Props) => {
    return {
      message: `The income start year ${incomeStartYear} should be before the income end year ${incomeEndYear}`,
      path: ["incomeStartYear"]
    }
  }
}
