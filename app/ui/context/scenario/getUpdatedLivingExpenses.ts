import { BasicYearData } from "@/app/lib/calculations/types"
import { LivingExpensesRecord } from "@/app/lib/data/schema/config"

export const getUpdatedLivingExpenses = (
  livingExpenses: LivingExpensesRecord[],
  newYear: number,
  expensesData: BasicYearData[]
): LivingExpensesRecord[] => {
  const newYearsConfig = livingExpenses.reduce(
    (accum, inflationRow) => {
      if (inflationRow.fromYear <= newYear) return accum
      accum.push(inflationRow.fromYear)
      return accum
    },
    [newYear] as number[]
  )
  const newLivingExpenses = newYearsConfig.map((year) => {
    const livingExpensesForYear = expensesData?.find((it) => it.year === year)
    if (!livingExpensesForYear) throw Error(`Living expenses not calculated for ${year}`)
    return { fromYear: year, amountInTodaysTerms: livingExpensesForYear.value }
  })

  return newLivingExpenses
}
