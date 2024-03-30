import { CashSchema, ScenarioSchema } from "@/app/lib/data/schema/config"
import { Asset } from "../../assets/Asset"
import { getDrawdownableAssets } from "../getDrawdownableAssets"
import { generateMock } from "@anatine/zod-mock"
import { AuBank } from "../../assets/AuBank"

describe("test", () => {
  const mockAssetConfig = generateMock(CashSchema)
  const mockScenarioConfig = generateMock(ScenarioSchema)
  const year = 2023

  it("should not return if not canDrawdown", () => {
    mockAssetConfig.canDrawdown = false
    mockAssetConfig.drawdown = { drawdownFrom: year - 1 }

    const asset = new AuBank(mockAssetConfig, year, mockScenarioConfig)

    const result = getDrawdownableAssets([asset], year)
    expect(result.length).toEqual(0)
  })
  it("should return if canDrawdown and no date from", () => {
    mockAssetConfig.canDrawdown = true
    mockAssetConfig.drawdown = {}

    const asset = new AuBank(mockAssetConfig, year, mockScenarioConfig)

    const result = getDrawdownableAssets([asset], year)
    expect(result.length).toEqual(1)
  })

  it("should return if canDrawdown and date from in past", () => {
    mockAssetConfig.canDrawdown = true
    mockAssetConfig.drawdown = { drawdownFrom: year - 1 }

    const asset = new AuBank(mockAssetConfig, year, mockScenarioConfig)

    const result = getDrawdownableAssets([asset], year)
    expect(result.length).toEqual(1)
  })

  it("should not return if canDrawdown and date from in future", () => {
    mockAssetConfig.canDrawdown = true
    mockAssetConfig.drawdown = { drawdownFrom: year + 1 }

    const asset = new AuBank(mockAssetConfig, year, mockScenarioConfig)

    const result = getDrawdownableAssets([asset], year)
    expect(result.length).toEqual(0)
  })
})
