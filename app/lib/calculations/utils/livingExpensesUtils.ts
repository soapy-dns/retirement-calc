import range from "lodash/range"
import { LivingExpensesRecord } from "../../data/schema/config"
import { BasicYearData, InflationContext } from "../types"

// Exposed for testing
export const getLivingExpensesInTodaysMoney = (yearRange: number[], livingExpensesConfig: LivingExpensesRecord[]) => {
  const sortedConfig = livingExpensesConfig.sort((a, b) => {
    if (a.fromYear > b.fromYear) return 1
    if (a.fromYear < b.fromYear) return -1
    return 0
  })

  const lastYearFromYearRange = yearRange[yearRange.length - 1]

  const livingExpensesRange = range(sortedConfig[0].fromYear, lastYearFromYearRange + 1) // + 1 to include end year

  let latestAmt: number
  const gaplessConfig = livingExpensesRange.map((year) => {
    const found = sortedConfig.find((it) => it.fromYear === year)
    if (found) {
      latestAmt = found.amountInTodaysTerms
      return { year: found.fromYear, value: found.amountInTodaysTerms }
    } else {
      return { year: year, value: latestAmt }
    }
  })
  return gaplessConfig
}

// CALCULATE LIVING EXPENSES FOR EACH YEAR TAKING INTO ACCOUNT ESTIMATED INFLATION
export const getLivingExpenses = (
  yearRange: number[],
  livingExpenses: LivingExpensesRecord[],
  inflationContext: InflationContext
) => {
  const livingExpensesTodaysMoney = getLivingExpensesInTodaysMoney(yearRange, livingExpenses)

  // living expenses in the money of the future years
  const projectedLivingExpenses = livingExpensesTodaysMoney.map(({ year, value }) => {
    if (!inflationContext[year]) throw new Error(`No inflation configuration for year ${year}`)
    const factor = inflationContext[year].factor

    return { year: year + 1, value: Math.round(value * factor) }
  })

  projectedLivingExpenses.unshift({
    year: projectedLivingExpenses[0].year - 1,
    value: livingExpensesTodaysMoney[0].value
  })

  const startYear = yearRange[0]
  const endYear = yearRange[yearRange.length - 1]

  const filteredLivingExpensesTodaysMoney: BasicYearData[] = livingExpensesTodaysMoney.filter((it) => {
    return it.year >= startYear && it.year <= endYear
  })

  const filteredProjectedLivingExpenses: BasicYearData[] = projectedLivingExpenses.filter((it) => {
    return it.year >= startYear && it.year <= endYear
  })

  return {
    livingExpensesTodaysMoney: filteredLivingExpensesTodaysMoney,
    projectedLivingExpenses: filteredProjectedLivingExpenses
  }
}

export const getLivingExpensesAmtForYear = (year: number, projectedLivingExpenses: BasicYearData[]): number => {
  const foundLivingExpenses = projectedLivingExpenses.find((it) => it.year === year)?.value
  return foundLivingExpenses || 0
}
