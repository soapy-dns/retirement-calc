import range from "lodash/range.js"
import { InflationRecord } from "../../data/schema"
import { InflationContext } from "../types"

export const getInflationForEachYear = (yearRange: number[], inflationConfig: InflationRecord[]) => {
  const sortedConfig = inflationConfig.sort((a, b) => {
    if (a.fromYear > b.fromYear) return 1
    if (a.fromYear < b.fromYear) return -1
    return 0
  })

  const lastYearFromYearRange = yearRange[yearRange.length - 1]

  const inflationRange = range(sortedConfig[0].fromYear, lastYearFromYearRange + 1) // + 1 to include end year

  let latestRate: number
  const gaplessInflationConfig: InflationRecord[] = inflationRange.map((year) => {
    const found = sortedConfig.find((it) => it.fromYear === year)
    if (found) {
      latestRate = found.inflationRate
      return found
    } else {
      return { fromYear: year, inflationRate: latestRate }
    }
  })
  return gaplessInflationConfig
}

export const getInflationContext = (yearRange: number[], inflationConfig: InflationRecord[]): InflationContext => {
  const gaplessInflationConfig = getInflationForEachYear(yearRange, inflationConfig)

  const inflationContext: InflationContext = gaplessInflationConfig.reduce((accum: InflationContext, it) => {
    const previousYearConfig = accum[it.fromYear - 1]
    const addOnFactor = 1 + it.inflationRate

    return {
      ...accum,
      [it.fromYear]: {
        inflation: it.inflationRate,
        factor: previousYearConfig ? previousYearConfig.factor * addOnFactor : addOnFactor
      }
    }
  }, {})

  return inflationContext
}
