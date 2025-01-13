import { sortByFromDate } from "@/app/lib/calculations/utils/sortObjectsByFromDate"
import { LivingExpensesRecord } from "@/app/lib/data/schema/config"

describe("Living expenses sort", () => {
  it("should sort ok", () => {
    const earliest: LivingExpensesRecord = { fromYear: 2024, amountInTodaysTerms: 100 }
    const early: LivingExpensesRecord = { fromYear: 2025, amountInTodaysTerms: 200 }
    const stillEarly: LivingExpensesRecord = { fromYear: 2025, amountInTodaysTerms: 300 }

    const latest: LivingExpensesRecord = { fromYear: 2026, amountInTodaysTerms: 400 }
    const result = sortByFromDate([latest, stillEarly, early, earliest])
    expect(result).toEqual([earliest, stillEarly, early, latest])
  })
})
