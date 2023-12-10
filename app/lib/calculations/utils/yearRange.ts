import range from "lodash/range.js"

export const getYearRange = (startingYear: number, numOfYears: number) => {
  const MAX_YEARS = 50

  const to = numOfYears < MAX_YEARS ? startingYear + numOfYears : startingYear + MAX_YEARS
  const yearRange = range(startingYear, to + 1) // does not inclue the end year but we calcNextYear

  return { yearRange, to }
}
