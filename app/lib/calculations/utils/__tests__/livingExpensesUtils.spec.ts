import { getLivingExpenses, getLivingExpensesInTodaysMoney } from "../livingExpensesUtils"
// import range from "lodash/range.js"
// import * as dataServices from "../../../data/scenarios"
import { LivingExpensesRecord } from "data/types"
import { InflationContext } from "../types"

// const getContextDataMock = jest.spyOn(dataServices, "getContextData")

describe("test", () => {
  it("should get living expenses in todays money without gaps", () => {
    const yearRange = [2023, 2024, 2025, 2026, 2027]

    // starts before year range, living expenses config continues after yearRange
    const livingExpensesConfig: LivingExpensesRecord[] = [
      { fromYear: 2022, amountInTodaysTerms: 100000 },
      { fromYear: 2025, amountInTodaysTerms: 50000 },
      { fromYear: 2028, amountInTodaysTerms: 20000 }
    ]

    const expectedResult = getLivingExpensesInTodaysMoney(yearRange, livingExpensesConfig)

    expect(expectedResult).toEqual([
      { year: 2022, value: 100000 },
      { year: 2023, value: 100000 },
      { year: 2024, value: 100000 },
      { year: 2025, value: 50000 },
      { year: 2026, value: 50000 },
      { year: 2027, value: 50000 }
    ])
  })

  it.only("should get living expenses in projected money", () => {
    const yearRange = [2023, 2024, 2025, 2026, 2027]

    // starts before year range, living expenses config continues after yearRange
    const livingExpensesConfig: LivingExpensesRecord[] = [
      { fromYear: 2022, amountInTodaysTerms: 100000 },
      { fromYear: 2025, amountInTodaysTerms: 50000 },
      { fromYear: 2028, amountInTodaysTerms: 20000 }
    ]

    const inflationContext = {
      "2022": { inflation: 0.1, factor: 1.1 },
      "2023": { inflation: 0.1, factor: 1.2100000000000002 },
      "2024": { inflation: 0.1, factor: 1.3310000000000004 },
      "2025": { inflation: 0.1, factor: 1.4641000000000006 },
      "2026": { inflation: 0.1, factor: 1.6105100000000008 },
      "2027": { inflation: 0.1, factor: 1.771561000000001 }
    }

    const expectedResult = getLivingExpenses(yearRange, livingExpensesConfig, inflationContext)

    expect(expectedResult).toEqual({
      livingExpensesTodaysMoney: [
        { value: 100000, year: 2022 },
        { value: 100000, year: 2023 },
        { value: 100000, year: 2024 },
        { value: 50000, year: 2025 },
        { value: 50000, year: 2026 },
        { value: 50000, year: 2027 }
      ],
      projectedLivingExpenses: [
        { value: 110000, year: 2022 },
        { value: 121000, year: 2023 },
        { value: 133100, year: 2024 },
        { value: 73205, year: 2025 },
        { value: 80526, year: 2026 },
        { value: 88578, year: 2027 }
      ]
    })
  })

  // it("should get living expenses in todays money", () => {
  //   getContextDataMock.mockReturnValue({
  //     livingExpenses: [
  //       { numYears: 5, amountInTodaysTerms: 100000 },
  //       { numYears: 5, amountInTodaysTerms: 50000 }
  //     ],
  //     startingYear: 2023
  //   })

  //   const scenarioId = "xxx"
  //   // factor isn't used here, just needs a value
  //   const inflationContext = {
  //     "2022": { inflation: 0.1, factor: 1.1 },
  //     "2023": { inflation: 0.05, factor: 1.1550000000000002 },
  //     "2024": { inflation: 0.03, factor: 1.1896500000000003 },
  //     "2025": { inflation: 0.03, factor: 1.2253395000000005 },
  //     "2026": { inflation: 0.03, factor: 1.2253395000000005 },
  //     "2027": { inflation: 0.03, factor: 1.2253395000000005 },
  //     "2028": { inflation: 0.03, factor: 1.2253395000000005 },
  //     "2029": { inflation: 0.03, factor: 1.2253395000000005 },
  //     "2030": { inflation: 0.03, factor: 1.2253395000000005 },
  //     "2031": { inflation: 0.03, factor: 1.2253395000000005 },
  //     "2032": { inflation: 0.03, factor: 1.2253395000000005 }
  //   }
  //   const yearRange = range(2022, 2032)

  //   const result = getLivingExpenses(scenarioId, inflationContext, yearRange)

  //   const expectedLivingExpensesTodaysMoney = [
  //     { year: 2023, value: 100000 },
  //     { year: 2024, value: 100000 },
  //     { year: 2025, value: 100000 },
  //     { year: 2026, value: 100000 },
  //     { year: 2027, value: 100000 },
  //     { year: 2028, value: 50000 },
  //     { year: 2029, value: 50000 },
  //     { year: 2030, value: 50000 },
  //     { year: 2031, value: 50000 },
  //     { year: 2032, value: 50000 }
  //   ]
  //   const { livingExpensesTodaysMoney } = result
  //   expect(livingExpensesTodaysMoney).toEqual(expectedLivingExpensesTodaysMoney)
  // })

  // it("should get living expenses in tomorrows money", () => {
  //   getContextDataMock.mockReturnValue({
  //     livingExpenses: [{ numYears: 5, amountInTodaysTerms: 100000 }],
  //     startingYear: 2022
  //   })

  //   const scenarioId = "xxx"
  //   const yearRange = range(2022, 2025)

  //   const inflationContext = {
  //     "2022": { inflation: 0.1, factor: 1.1 },
  //     "2023": { inflation: 0.05, factor: 1.1550000000000002 },
  //     "2024": { inflation: 0.03, factor: 1.1896500000000003 },
  //     "2025": { inflation: 0.03, factor: 1.2253395000000005 }
  //   }

  //   const result = getLivingExpenses(scenarioId, inflationContext, yearRange)

  //   const expectedProjectedLivingExpenses = [
  //     { year: 2022, value: 110000 },
  //     { year: 2023, value: 115500 },
  //     { year: 2024, value: 118965 }
  //   ]
  //   const { projectedLivingExpenses } = result
  //   expect(projectedLivingExpenses).toEqual(expectedProjectedLivingExpenses)
  // })
})
