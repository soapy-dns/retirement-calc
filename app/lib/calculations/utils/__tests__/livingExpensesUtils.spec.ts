import { getLivingExpenses, getLivingExpensesInTodaysMoney } from "../livingExpensesUtils"
// import { getStartingYear } from "../getStartingYear"
// import { range } from "lodash"
import { LivingExpensesRecord } from "@/app/lib/data/schema/config"

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

  it("should get correct living expenses when config starts and ends before/after the year range", () => {
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

    const result = getLivingExpenses(yearRange, livingExpensesConfig, inflationContext)

    expect(result).toEqual({
      livingExpensesTodaysMoney: [
        // { value: 100000, year: 2022 },
        { value: 100000, year: 2023 },
        { value: 100000, year: 2024 },
        { value: 50000, year: 2025 },
        { value: 50000, year: 2026 },
        { value: 50000, year: 2027 }
      ],
      projectedLivingExpenses: [
        { value: 110000, year: 2023 },
        { value: 121000, year: 2024 },
        { value: 133100, year: 2025 },
        { value: 73205, year: 2026 },
        { value: 80526, year: 2027 }
      ]
    })
  })

  it("should get correct living expenses when config starts and ends before/after the year range", () => {
    const yearRange = [2023, 2024, 2025, 2026, 2027]

    // starts before year range, living expenses config continues after yearRange
    const livingExpensesConfig: LivingExpensesRecord[] = [
      { fromYear: 2023, amountInTodaysTerms: 100000 },
      { fromYear: 2025, amountInTodaysTerms: 50000 },
      { fromYear: 2028, amountInTodaysTerms: 20000 }
    ]

    const inflationContext = {
      2023: { inflation: 0.1, factor: 1.1 },
      2024: { inflation: 0.1, factor: 1.2100000000000002 },
      2025: { inflation: 0.1, factor: 1.3310000000000004 },
      2026: { inflation: 0.1, factor: 1.4641000000000006 },
      2027: { inflation: 0.1, factor: 1.6105100000000008 },
      2028: { inflation: 0.1, factor: 1.771561000000001 }
    }

    const result = getLivingExpenses(yearRange, livingExpensesConfig, inflationContext)

    expect(result).toEqual({
      livingExpensesTodaysMoney: [
        { value: 100000, year: 2023 },
        { value: 100000, year: 2024 },
        { value: 50000, year: 2025 },
        { value: 50000, year: 2026 },
        { value: 50000, year: 2027 }
      ],
      projectedLivingExpenses: [
        { year: 2023, value: 100000 },
        { year: 2024, value: 110000 },
        { year: 2025, value: 121000 },
        { year: 2026, value: 66550 },
        { year: 2027, value: 73205 }
      ]
    })
  })
})
