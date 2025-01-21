import { CashSchema, ScenarioSchema } from "@/app/lib/data/schema/config"
import { generateMock } from "@anatine/zod-mock"
import { AuBank } from "../AuBank"

jest.mock("../../tax/utils", () => ({
  getPercIncomeTaxable: () => 100,
  getPercentageOfDrawdownTaxable: () => 0
}))

describe("Cash calculate the next year's values", () => {
  const mockCashAssetConfig = generateMock(CashSchema)
  const mockScenarioConfig = generateMock(ScenarioSchema)
  const year = 2023

  // Auto drawdowns must affect the income TODO:
  it("should calculate next value correctly", () => {
    const latestYearData = { year, value: 1000000, income: 0 }
    mockCashAssetConfig.rateVariation = 0
    mockScenarioConfig.context.auBank.interestRate = 0.05

    const cashAsset = new AuBank(mockCashAssetConfig, year, mockScenarioConfig)
    cashAsset.history.push(latestYearData)

    const assets = [cashAsset]

    const result = cashAsset.calcNextYear(latestYearData, assets)

    expect(result.year).toBe(year + 1)
    expect(result.income).toBe(50000)
    expect(result.value).toBe(latestYearData.value) // ok, why is this?
  })
})
