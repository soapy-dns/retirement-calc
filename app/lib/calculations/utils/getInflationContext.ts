import range from "lodash/range.js"
import { InflationRecord } from "../../data/types"
import { InflationContext } from "../types"

// export const getInflationForEachYear = (yearRange: number[], inflationConfig: number[] | undefined) => {
//   let inflationValue = 0 // default to 0
//   const inflationContext = yearRange.reduce((accum, value, index) => {
//     inflationValue = inflationConfig?.[index] || inflationValue
//     return { ...accum, [value]: { inflation: inflationValue } }
//   }, {})

//   return inflationContext
// }

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

// export const getInflationContextOld = (
//   yearRange: number[],
//   inflationConfig: number[] | undefined
// ): InflationContext => {
//   const context = getInflationForEachYear(yearRange, inflationConfig)

//   yearRange.forEach((year: number, index: number) => {
//     const thisYearsData = context[year]
//     if (index === 0) {
//       thisYearsData.factor = 1
//     } else {
//       const previousYear = year - 1

//       const previousYearsData = context[previousYear]

//       const addOnFactor = 1 + previousYearsData.inflation

//       thisYearsData.factor = previousYearsData.factor * addOnFactor
//     }
//   })

//   return context
// }
