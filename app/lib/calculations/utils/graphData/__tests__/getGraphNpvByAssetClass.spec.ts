import { getGraphNpvByAssetClass } from "../getGraphNpvByAssetClass"
import { Asset } from "../../../assets/Asset"
import {
  generateMockBankAsset,
  generateMockScenarioConfig,
  generateMockSuperAsset,
  generateMockSharesAsset,
  generateMockPropertyAsset
} from "@/app/lib/testUtils"

describe("getGraphNpvByAssetClass", () => {
  const year = 2023
  const mockScenarioConfig = generateMockScenarioConfig()

  it("should return unique asset groups with correctly aggregated NPV data", () => {
    const mockBankAsset1 = generateMockBankAsset(mockScenarioConfig, year)
    mockBankAsset1.history = [
      { value: 100, year: year, income: 0, transferAmt: 0 },
      { value: 200, year: year + 1, income: 0, transferAmt: 0 }
    ]

    const mockBankAsset2 = generateMockBankAsset(mockScenarioConfig, year)
    mockBankAsset2.history = [
      { value: 100, year: year, income: 0, transferAmt: 0 },
      { value: 200, year: year + 1, income: 0, transferAmt: 0 }
    ]

    const mockPropertyAsset1 = generateMockPropertyAsset(mockScenarioConfig, year)
    mockPropertyAsset1.history = [
      { value: 1000, year: year, income: 0, transferAmt: 0 },
      { value: 2000, year: year + 1, income: 0, transferAmt: 0 }
    ]

    const mockPropertyAsset2 = generateMockPropertyAsset(mockScenarioConfig, year)
    mockPropertyAsset2.history = [
      { value: 1000, year: year, income: 0, transferAmt: 0 },
      { value: 2000, year: year + 1, income: 0, transferAmt: 0 }
    ]

    const mockSharesAsset1 = generateMockSharesAsset(mockScenarioConfig, year)
    mockSharesAsset1.history = [
      { value: 150, year: year, income: 0, transferAmt: 0 },
      { value: 250, year: year + 1, income: 0, transferAmt: 0 }
    ]

    const mockSharesAsset2 = generateMockSharesAsset(mockScenarioConfig, year)
    mockSharesAsset2.history = [
      { value: 150, year: year, income: 0, transferAmt: 0 },
      { value: 250, year: year + 1, income: 0, transferAmt: 0 }
    ]

    const mockSuperAsset1 = generateMockSuperAsset(mockScenarioConfig, year)
    mockSuperAsset1.history = [
      { value: 300, year: year, income: 0, transferAmt: 0 },
      { value: 400, year: year + 1, income: 0, transferAmt: 0 }
    ]

    const mockSuperAsset2 = generateMockSuperAsset(mockScenarioConfig, year)
    mockSuperAsset2.history = [
      { value: 300, year: year, income: 0, transferAmt: 0 },
      { value: 400, year: year + 1, income: 0, transferAmt: 0 }
    ]

    const assets: Asset[] = [
      mockBankAsset1,
      mockBankAsset2,
      mockPropertyAsset1,
      mockPropertyAsset2,
      mockSharesAsset1,
      mockSharesAsset2,
      mockSuperAsset1,
      mockSuperAsset2
    ]

    const result = getGraphNpvByAssetClass(assets)

    console.log("result", result)
    expect(result).toHaveProperty("cash")
    expect(result).toHaveProperty("property")
    expect(result).toHaveProperty("shares")
    expect(result).toHaveProperty("super")

    expect(result.cash.length).toBe(2)
    expect(result.cash[0]).toEqual({ year: year, value: 200 })
    expect(result.cash[1]).toEqual({ year: year + 1, value: 400 })

    expect(result.property.length).toBe(2)
    expect(result.property[0]).toEqual({ year: year, value: 2000 })
    expect(result.property[1]).toEqual({ year: year + 1, value: 4000 })

    expect(result.shares.length).toBe(2)
    expect(result.shares[0]).toEqual({ year: year, value: 300 })
    expect(result.shares[1]).toEqual({ year: year + 1, value: 500 })

    expect(result.super.length).toBe(2)
    expect(result.super[0]).toEqual({ year: year, value: 600 })
    expect(result.super[1]).toEqual({ year: year + 1, value: 800 })
  })
})
