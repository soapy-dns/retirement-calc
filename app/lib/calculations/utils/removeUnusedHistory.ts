// This is a bit of a hack.  It is used to cut off history items which are not needed.

import { BasicYearData } from "../types"

//This is probably because we prefill the taxes with the full history, but we don't want to show it all in the spreadsheet
export const removeUnusedHistory = (yearData: BasicYearData[], finalYear: number): BasicYearData[] => {
  const filteredYearData = yearData.filter((it) => it.year < finalYear)
  return filteredYearData
}
