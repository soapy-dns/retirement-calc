import { getUpdatedLivingExpensesConfig } from "../getUpdatedLivingExpensesConfig"
import { IScenario } from "@/app/lib/data/schema/config"
import { getInflationFactorAtNewYear } from "../getInflationFactorAtNewYear"

jest.mock("../getInflationFactorAtNewYear")

describe("getUpdatedLivingExpensesConfig", () => {
  const mockGetInflationFactorAtNewYear = getInflationFactorAtNewYear as jest.Mock

  beforeEach(() => {
    mockGetInflationFactorAtNewYear.mockClear()
  })

  it("should throw an error if newYear is less than the first year in livingExpensesConfig", () => {
    const scenario: IScenario = {
      asAtYear: 2020,
      context: {
        inflation: [],
        livingExpenses: [{ fromYear: 2021, amountInTodaysTerms: 1000 }]
      }
    }

    expect(() => getUpdatedLivingExpensesConfig(scenario, 2020)).toThrow(
      "invalid new year for calculating living expenses"
    )
  })

  it("should return updated living expenses config for a new year greater than the last year in the config", () => {
    const scenario: IScenario = {
      asAtYear: 2020,
      context: {
        inflation: [],
        livingExpenses: [{ fromYear: 2021, amountInTodaysTerms: 1000 }]
      }
    }

    mockGetInflationFactorAtNewYear.mockReturnValue(1.1)

    const result = getUpdatedLivingExpensesConfig(scenario, 2022)

    expect(result).toEqual([{ fromYear: 2022, amountInTodaysTerms: 1100 }])
  })

  it("should return updated living expenses config for a new year within the config range", () => {
    const scenario: IScenario = {
      asAtYear: 2020,
      context: {
        inflation: [],
        livingExpenses: [
          { fromYear: 2021, amountInTodaysTerms: 1000 },
          { fromYear: 2023, amountInTodaysTerms: 1100 }
        ]
      }
    }

    mockGetInflationFactorAtNewYear.mockReturnValue(1.1)

    const result = getUpdatedLivingExpensesConfig(scenario, 2022)

    expect(result).toEqual([
      { fromYear: 2022, amountInTodaysTerms: 1100 },
      { fromYear: 2023, amountInTodaysTerms: 1210 }
    ])
  })
})
