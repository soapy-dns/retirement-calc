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

type IncomeValidatorProps = { incomeStartYear?: number; incomeEndYear?: number }

export const incomeValidator = {
  validator: ({ incomeStartYear, incomeEndYear }: IncomeValidatorProps) => {
    if (!incomeStartYear || !incomeEndYear) return true
    return incomeStartYear < incomeEndYear
  },
  options: ({ incomeStartYear, incomeEndYear }: IncomeValidatorProps) => {
    return {
      message: `The income start year ${incomeStartYear} should be before the income end year ${incomeEndYear}`,
      path: ["incomeStartYear"]
    }
  }
}

type DrawdownOrderValidatorProps = { canDrawdown?: boolean | string; drawdownOrder?: number }
export const drawdownOrderValidator = {
  validator: ({ canDrawdown, drawdownOrder }: DrawdownOrderValidatorProps) => {
    if (canDrawdown && canDrawdown !== "N" && !drawdownOrder) return false
    return true
  },
  options: {
    message: "A drawdownable asset must have a drawdown order set",
    path: ["canDrawdown"]
  }
}
