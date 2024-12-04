import { YearsTaxData } from "../assets/types"

export const accumTaxData = (yearDataHistory: YearsTaxData[]): YearsTaxData[] => {
  return yearDataHistory.reduce((accum, thisYearData) => {
    const { year, value, totalTaxableAmt, taxableIncomeAmt, taxableDrawdownsAmt, taxableAutomatedDrawdownAmt } =
      thisYearData
    const foundYearData = accum.find((it) => it.year === thisYearData.year)
    if (foundYearData) {
      foundYearData.value = foundYearData.value + value
      foundYearData.taxableIncomeAmt = foundYearData.taxableIncomeAmt + taxableIncomeAmt
      foundYearData.taxableDrawdownsAmt = foundYearData.taxableDrawdownsAmt + taxableDrawdownsAmt
      foundYearData.totalTaxableAmt = foundYearData.totalTaxableAmt + totalTaxableAmt
      foundYearData.taxableAutomatedDrawdownAmt =
        foundYearData.taxableAutomatedDrawdownAmt + taxableAutomatedDrawdownAmt
    } else {
      accum.push({ ...thisYearData })
      //
    }
    return accum
  }, [] as YearsTaxData[])
}
