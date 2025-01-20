import { getNetTransferAmtForYear } from "../getNetTransferAmtForYear"
import { Transfer, TransferWithIdSchema } from "../../../data/schema/config"
import { Asset } from "../../assets/Asset"
import * as getTransferFromAmtModule from "../getTransferFromAmt"
import * as getTransferToAmtModule from "../getTransferToAmt"

import { generateMock } from "@anatine/zod-mock"

const mockTransfer = generateMock(TransferWithIdSchema)
const transfer1 = { ...mockTransfer, from: "asset1", to: "asset2", year: 2023, transferPercent: 10 }
const transfer2 = { ...mockTransfer, from: "asset1", to: "asset2", year: 2023, transferPercent: 10 }

const mockSingleTransfers: Transfer[] = [transfer1]
const mockMultipleTransfers: Transfer[] = [transfer1, transfer2]
const mockAssets: Asset[] = [{} as Asset]

jest.mock("../getTransferFromAmt")
jest.mock("../getTransferToAmt")

describe("getNetTransferAmtForYear", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should calculate net transfer amount for single 'from' only", () => {
    getTransferFromAmtModule.getTransferFromAmt.mockReturnValue(1000)

    const prevValue = 1000

    const result = getNetTransferAmtForYear(2023, mockSingleTransfers, "asset1", prevValue, mockAssets)

    expect(getTransferFromAmtModule.getTransferFromAmt).toHaveBeenCalledTimes(1)
    expect(getTransferFromAmtModule.getTransferFromAmt).toHaveBeenCalledWith(transfer1, prevValue)
    expect(result).toBe(-1000)
  })

  it("should calculate net transfer amount for single'to' only", () => {
    getTransferToAmtModule.getTransferToAmt.mockReturnValue(1000)

    const prevValue = 1000

    const result = getNetTransferAmtForYear(2023, mockSingleTransfers, "asset2", prevValue, mockAssets)

    expect(getTransferToAmtModule.getTransferToAmt).toHaveBeenCalledTimes(1)

    expect(getTransferToAmtModule.getTransferToAmt).toHaveBeenCalledWith(transfer1, mockAssets)
    expect(result).toBe(1000)
  })

  it("should calculate net transfer amount for multiple 'from' only", () => {
    getTransferFromAmtModule.getTransferFromAmt.mockReturnValue(1000)

    const prevValue = 1000

    const result = getNetTransferAmtForYear(2023, mockMultipleTransfers, "asset1", prevValue, mockAssets)

    expect(getTransferFromAmtModule.getTransferFromAmt).toHaveBeenCalledTimes(2)
    expect(getTransferFromAmtModule.getTransferFromAmt).toHaveBeenCalledWith(transfer1, prevValue)
    expect(result).toBe(-2000)
  })

  it("should calculate net transfer amount for multiple'to' only", () => {
    getTransferToAmtModule.getTransferToAmt.mockReturnValue(1000)

    const prevValue = 1000

    const result = getNetTransferAmtForYear(2023, mockMultipleTransfers, "asset2", prevValue, mockAssets)

    expect(getTransferToAmtModule.getTransferToAmt).toHaveBeenCalledTimes(2)

    expect(getTransferToAmtModule.getTransferToAmt).toHaveBeenCalledWith(transfer1, mockAssets)
    expect(result).toBe(2000)
  })
})
