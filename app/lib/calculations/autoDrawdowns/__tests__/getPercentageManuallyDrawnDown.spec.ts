import { getPercentageManuallyDrawnDown } from "../getPercentageManuallyDrawnDown"
import { Asset } from "../../assets/Asset"
import { Transfer } from "../../../data/schema/config"

describe("getPercentageManuallyDrawnDown", () => {
  const assets: Asset[] = [
    { id: "1", className: "AuSuper" },
    { id: "2", className: "non-super" },
    { id: "3", className: "AuSuper" }
  ]

  const transfers: Transfer[] = [
    { from: "1", to: "2", transferPercent: 10 },
    { from: "1", to: "3", transferPercent: 20 },
    { from: "2", to: "3", transferPercent: 30 }
  ]

  it("should return the correct percentage for manual drawdowns", () => {
    const assetId = "1"
    const result = getPercentageManuallyDrawnDown(assetId, transfers, assets)
    expect(result).toBe(10) // only the 1st transfer is a manual drawdown. 1->3 is a transfer between super funds
  })

  it("should return 0 if there are no transfers from the given asset", () => {
    const result = getPercentageManuallyDrawnDown("3", transfers, assets)
    expect(result).toBe(0)
  })

  it("should return 0 if the asset does not exist", () => {
    const result = getPercentageManuallyDrawnDown("4", transfers, assets)
    expect(result).toBe(0)
  })
})
