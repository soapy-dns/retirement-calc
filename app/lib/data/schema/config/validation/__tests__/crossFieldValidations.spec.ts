import { generateMock } from "@anatine/zod-mock"
import { CashSchema, ScenarioSchema } from "../.."
import { assetsVsOwners } from ".."

describe("Validate assetOwners against context owners", () => {
  const mockCashAssetConfig = generateMock(CashSchema)
  const mockScenarioConfig = generateMock(ScenarioSchema)
  const { context } = mockScenarioConfig
  context.owners = [
    { identifier: "C", ownerName: "C", gender: "M" },
    { identifier: "D", ownerName: "D", gender: "F" }
  ]
  it("should be false when 2 asset owners not found", () => {
    mockCashAssetConfig.assetOwners = ["A", "B"]

    const result = assetsVsOwners([mockCashAssetConfig], context)

    expect(result).toBe(false)
  })

  it("should be false when 2nd asset owner not found", () => {
    mockCashAssetConfig.assetOwners = ["C", "B"]

    const result = assetsVsOwners([mockCashAssetConfig], context)

    expect(result).toBe(false)
  })

  it("should be false when 1st asset owner not found", () => {
    mockCashAssetConfig.assetOwners = ["C", "A"]

    const result = assetsVsOwners([mockCashAssetConfig], context)

    expect(result).toBe(false)
  })

  it("should be false when both asset owners found", () => {
    mockCashAssetConfig.assetOwners = ["C", "D"]

    const result = assetsVsOwners([mockCashAssetConfig], context)

    expect(result).toBe(true)
  })
})
