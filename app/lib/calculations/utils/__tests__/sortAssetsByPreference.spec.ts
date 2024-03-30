import { generateMock } from "@anatine/zod-mock"
import { Asset } from "../../assets/Asset"
import { sortByPreference } from "../sortAssetsByPreference"
import { CashSchema, ScenarioSchema } from "@/app/lib/data/schema/config"
import { AuBank } from "../../assets/AuBank"

describe("test", () => {
  it("should sort correctly", () => {
    const mockAssetConfig1 = generateMock(CashSchema)
    const mockAssetConfig2 = generateMock(CashSchema)
    const mockScenarioConfig = generateMock(ScenarioSchema)
    const year = 2023

    mockAssetConfig1.canDrawdown = true
    mockAssetConfig1.drawdown = { drawdownOrder: 10 }

    mockAssetConfig2.canDrawdown = true
    mockAssetConfig2.drawdown = { drawdownOrder: 20 }

    const assets = [
      new AuBank(mockAssetConfig2, year, mockScenarioConfig),
      new AuBank(mockAssetConfig1, year, mockScenarioConfig)
    ]
    const result = sortByPreference(assets)
    expect(result[0].drawdownOrder).toBe(10)
    expect(result[1].drawdownOrder).toBe(20)
  })
})
