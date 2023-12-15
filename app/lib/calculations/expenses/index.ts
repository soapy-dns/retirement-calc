import { Tax } from "../assets/types"
import { getTaxAmtForYear } from "../tax/getTaxAmt"
import { BasicYearData } from "../types"
import { getLivingExpensesAmtForYear } from "../utils/livingExpensesUtils"

export const getTotalExpenses = (year: number, taxes: Tax[], livingExpenses: BasicYearData[]): number => {
  const provisionaltotalTaxesAmt = getTaxAmtForYear(taxes, year) //all owners
  const provisionalLivingExpenseForYearAmt = getLivingExpensesAmtForYear(year, livingExpenses)

  return provisionaltotalTaxesAmt + provisionalLivingExpenseForYearAmt
}
