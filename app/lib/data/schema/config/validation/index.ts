import { InflationRecord, LivingExpensesRecord } from ".."

export const validateLivingExpensesVsInflation = (
  livingExpenses: LivingExpensesRecord[],
  inflation: InflationRecord[]
) => {
  // TODO: sort - just getting the 1st for simplicity
  return livingExpenses[0].fromYear >= inflation[0].fromYear
}
