import { getTransferToAmt } from "../getTransferToAmt"
import { Transfer } from "../../../data/schema/config"
import { Asset } from "../../assets/Asset"
import { getTransferAmountForTransferFromAsset } from "../getTransferAmountForTransferFromAsset"

jest.mock("../getTransferAmountForTransferFromAsset", () => ({
  getTransferAmountForTransferFromAsset: jest.fn()
}))

describe("getTransferToAmt", () => {
  const mockAssets: Asset[] = [
    { id: "1", name: "Asset 1", value: 1000 },
    { id: "2", name: "Asset 2", value: 2000 }
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should return the correct amount for FUTURE_MONEY transfer cost type", () => {
    const transfer: Transfer = {
      id: "1",
      transferCostType: "FUTURE_MONEY",
      transferCostValue: 100
    }
    ;(getTransferAmountForTransferFromAsset as jest.Mock).mockReturnValue(1000)

    const result = getTransferToAmt(transfer, mockAssets)
    expect(result).toBe(900)
  })

  it("should return the correct amount for PERCENTAGE transfer cost type", () => {
    const transfer: Transfer = {
      id: "2",
      transferCostType: "PERCENTAGE", // 10% of the transfer amt
      transferCostValue: 10
    }
    ;(getTransferAmountForTransferFromAsset as jest.Mock).mockReturnValue(1000)

    const result = getTransferToAmt(transfer, mockAssets)
    expect(result).toBe(900)
  })

  it("should return 0 for unknown transfer cost type", () => {
    const transfer: Transfer = {
      id: "3",
      transferCostType: "UNKNOWN",
      transferCostValue: 100
    }
    ;(getTransferAmountForTransferFromAsset as jest.Mock).mockReturnValue(1000)

    const result = getTransferToAmt(transfer, mockAssets)
    expect(result).toBe(0)
  })
})
