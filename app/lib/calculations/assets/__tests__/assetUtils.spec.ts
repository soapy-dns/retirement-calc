import { CashSchema, ScenarioSchema, SharesSchema, SuperSchema } from "@/app/lib/data/schema/config"
import { generateMock } from "@anatine/zod-mock"
import { AuBank } from "../AuBank"
import { AuSuper } from "../AuSuper"
import { AuShares } from "../AuShares"
import { getGroupedDrawdownableAssets } from "../assetUtils"

describe("getGroupedDrawdownableAssets", () => {
  const mockCashConfig = generateMock(CashSchema)
  const mockSuperConfig = generateMock(SuperSchema)
  const mockShareConfig = generateMock(SharesSchema)
  const mockScenarioConfig = generateMock(ScenarioSchema)
  const year = 2023

  it("should return a group correctly based on the drawdownOrder", () => {
    mockCashConfig.canDrawdown = true
    mockCashConfig.drawdown = { drawdownOrder: 20 }
    mockSuperConfig.canDrawdown = true
    mockSuperConfig.drawdown = { drawdownOrder: 50 }
    mockShareConfig.canDrawdown = true
    mockShareConfig.drawdown = { drawdownOrder: 20 }
    const cashAsset = new AuBank(mockCashConfig, year, mockScenarioConfig)
    const superAsset = new AuSuper(mockSuperConfig, year, mockScenarioConfig)
    const shareAsset = new AuShares(mockShareConfig, year, mockScenarioConfig)

    const assets = [cashAsset, superAsset, shareAsset]

    const results = getGroupedDrawdownableAssets(year, assets)

    // should be 2 arrays - first holding 2 assets, the 2nd only 1
    expect(results[0].length).toBe(2)
    expect(results[1].length).toBe(1)
  })
})
