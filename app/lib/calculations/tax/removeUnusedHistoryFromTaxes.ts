import { EarningsTax, Tax } from "../assets/types"
import { BasicYearData } from "../types"

// TODO:: If we didn't prefil the taxes, we wouldn't have to do this hack
export const removeUnusedHistoryFromTaxes = (taxes: Tax[] | EarningsTax[], finalYear: number): EarningsTax[] => {
  return taxes.map((ownersTax) => {
    const filteredHistory = ownersTax.history.filter((it) => it.year < finalYear)
    return { ...ownersTax, history: filteredHistory }
  })
}
