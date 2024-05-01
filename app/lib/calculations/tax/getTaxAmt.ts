import { EarningsTax, Tax } from "../assets/types"

// TOTAL TAX AMOUNT FOR THIS YEAR (All asset owners)
export const getTaxAmtForYear = (taxes: Tax[] | EarningsTax[], year: number): number => {
  const totalTaxesAmt = taxes.reduce((accum: number, taxForPerson: EarningsTax) => {
    const taxDetailsForYear = taxForPerson.history.find((it) => it.year === year)
    const taxAmount = taxDetailsForYear?.value || 0
    return accum + taxAmount
  }, 0)

  return Math.round(totalTaxesAmt)
}
