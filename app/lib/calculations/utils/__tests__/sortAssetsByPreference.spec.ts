import { generateMock } from "@/app/lib/testUtils"
import { sortByDrawdownOrder } from "../sortAssetsByPreference"
import { CashAsset, CashSchema, ScenarioSchema, IScenario } from "@/app/lib/data/schema/config"
import { AuBank } from "../../assets/AuBank"

describe("test", () => {
  it("should sort correctly", () => {
    const mockAssetConfig1 = generateMock<CashAsset>(CashSchema)
    const mockAssetConfig2 = generateMock<CashAsset>(CashSchema)
    const mockScenarioConfig = generateMock<IScenario>(ScenarioSchema)
    const year = 2023

    mockAssetConfig1.canDrawdown = true
    mockAssetConfig1.drawdown = { drawdownOrder: 10 }

    mockAssetConfig2.canDrawdown = true
    mockAssetConfig2.drawdown = { drawdownOrder: 20 }

    const assets = [
      new AuBank(mockAssetConfig2, year, mockScenarioConfig),
      new AuBank(mockAssetConfig1, year, mockScenarioConfig)
    ]
    const result = sortByDrawdownOrder(assets)
    expect(result[0].drawdownOrder).toBe(10)
    expect(result[1].drawdownOrder).toBe(20)
  })
})
