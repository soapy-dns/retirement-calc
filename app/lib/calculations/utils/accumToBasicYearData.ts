import { BasicYearData } from "../types"
import { YearsTaxData } from "../assets/types"

/*
Takes any sort of tax history and sums the VALUE for each year to return an array of BasicYearData
*/
export const accumToBasicYearData = (yearDataHistory: BasicYearData[] | YearsTaxData[]): BasicYearData[] => {
  return yearDataHistory.reduce((accum, yearData) => {
    const foundYearData = accum.find((it) => it.year === yearData.year)
    if (foundYearData) {
      foundYearData.value = foundYearData.value + yearData.value
    } else {
      accum.push({ year: yearData.year, value: yearData.value })
    }
    return accum
  }, [] as BasicYearData[])
}
