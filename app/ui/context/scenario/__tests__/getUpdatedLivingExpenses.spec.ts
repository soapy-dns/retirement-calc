import { getUpdatedLivingExpenses } from "../getUpdatedLivingExpenses"
import { BasicYearData } from "@/app/lib/calculations/types"
import { LivingExpensesRecord } from "@/app/lib/data/schema/config"

describe("getUpdatedLivingExpenses", () => {
  it("should return updated living expenses for the new year", () => {
    const livingExpenses: LivingExpensesRecord[] = [
      { fromYear: 2020, amountInTodaysTerms: 1000 },
      { fromYear: 2021, amountInTodaysTerms: 1100 }
    ]
    const newYear = 2022
    const expensesData: BasicYearData[] = [
      { year: 2020, value: 1000 },
      { year: 2021, value: 1100 },
      { year: 2022, value: 1200 }
    ]

    const result = getUpdatedLivingExpenses(livingExpenses, newYear, expensesData)

    expect(result).toEqual([{ fromYear: 2022, amountInTodaysTerms: 1200 }])
  })

  it("should throw an error if living expenses are not calculated for the new year", () => {
    const livingExpenses: LivingExpensesRecord[] = [
      { fromYear: 2020, amountInTodaysTerms: 1000 },
      { fromYear: 2021, amountInTodaysTerms: 1100 }
    ]
    const newYear = 2023
    const expensesData: BasicYearData[] = [
      { year: 2020, value: 1000 },
      { year: 2021, value: 1100 }
    ]

    expect(() => getUpdatedLivingExpenses(livingExpenses, newYear, expensesData)).toThrow(
      "Living expenses not calculated for 2023"
    )
  })

  it("should return an empty array if no living expenses are provided", () => {
    const livingExpenses: LivingExpensesRecord[] = []
    const newYear = 2022
    const expensesData: BasicYearData[] = [{ year: 2022, value: 1200 }]

    const result = getUpdatedLivingExpenses(livingExpenses, newYear, expensesData)

    expect(result).toEqual([{ fromYear: 2022, amountInTodaysTerms: 1200 }])
  })

  it("should handle multiple new years correctly", () => {
    const livingExpenses: LivingExpensesRecord[] = [
      { fromYear: 2020, amountInTodaysTerms: 1000 },
      { fromYear: 2021, amountInTodaysTerms: 1100 }
    ]
    const newYear = 2023
    const expensesData: BasicYearData[] = [
      { year: 2020, value: 1000 },
      { year: 2021, value: 1100 },
      { year: 2022, value: 1200 },
      { year: 2023, value: 1300 }
    ]

    const result = getUpdatedLivingExpenses(livingExpenses, newYear, expensesData)

    expect(result).toEqual([{ fromYear: 2023, amountInTodaysTerms: 1300 }])
  })
})
