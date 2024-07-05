import { AssetClass, CashAsset, IAsset, IncomeAsset, LiquidAsset, PropertyAsset } from ".."
import { isCashAsset, isLiquidAsset } from "@/app/ui/utils"

// VALIDATE CONTEXT
// export const validateLivingExpensesVsInflation = (
//   livingExpenses: LivingExpensesRecord[],
//   inflation: InflationRecord[]
// ) => {
//   // TODO: sort - just getting the 1st for simplicity
//   if (livingExpenses[0]) {
//     const startYear = getStartingYear()

//     return livingExpenses[0].fromYear || startYear >= inflation[0].fromYear
//   }
// }

// VALIDATE ASSETS
export const validateIncomeBucket = (assets: IAsset[]) => {
  const incomeBucketAssets = assets.filter((it) => {
    if (isCashAsset(it.className)) {
      const cashAsset = it as CashAsset
      return cashAsset.incomeBucket === true
    }
    return false
  })

  return incomeBucketAssets.length === 1
}

// VALIDATE TRANSFERS
// export const yearNotPassed = (year: number) => {
//   const nowYear = getStartingYear()

//   return nowYear <= year
// }

// The next validations related to assets. Perhaps this could be separated out.
export const incomeValidator = {
  validator: (data: { className: string }): boolean => {
    const { className } = data
    if (className === "Salary" || className === "AuDefinedBenefits") {
      const { income } = data as IncomeAsset
      const { incomeStartYear, incomeEndYear } = income
      if (!incomeStartYear || !incomeEndYear) return true
      return incomeStartYear <= incomeEndYear
    }
    return true
  },
  options: (data: { className: string }) => {
    const { className } = data
    if (className === "Salary" || className === "AuDefinedBenefits") {
      const { income } = data as IncomeAsset
      const { incomeStartYear, incomeEndYear } = income
      // if (!incomeStartYear || !incomeEndYear) return true
      // return incomeStartYear <= incomeEndYear
      return {
        message: `The income start year ${incomeStartYear} should be before the income end year ${incomeEndYear}`,
        path: ["income.incomeStartYear"]
      }
    }
    return { message: "Validation Error" }
  }
}

export const drawdownOrderValidator = {
  validator: (data: { className: AssetClass }): boolean => {
    const { className } = data
    if (isLiquidAsset(className)) {
      const { drawdown, canDrawdown } = data as LiquidAsset
      const { drawdownOrder } = drawdown || {}
      if (canDrawdown && !drawdownOrder) return false
      return true
    }
    return true
  },
  options: {
    message: "A drawdownable asset must have a drawdown order set",
    path: ["canDrawdown"]
  }
}

export const propertyValidator = {
  validator: (data: { className: string }): boolean => {
    const { className } = data
    if (["AuProperty"].includes(className)) {
      const { property } = data as PropertyAsset
      const { isRented, rentalIncomePerMonth } = property
      if (isRented && !rentalIncomePerMonth) return false
      return true
    }
    return true
  },
  options: {
    message: "Rented out properties must have a rental income.",
    path: ["property.isRented"]
  }
}
