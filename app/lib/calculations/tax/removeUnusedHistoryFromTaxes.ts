import { EarningsTax, Tax } from "../assets/types"

// TODO: we shouldn't prefill taxes
export const removeUnusedHistoryFromTaxes = (taxes: Tax[] | EarningsTax[], finalYear: number): EarningsTax[] => {
  return taxes.map((ownersTax) => {
    const filteredHistory = ownersTax.history.filter((it) => it.year < finalYear)
    return { ...ownersTax, history: filteredHistory }
  })
}
