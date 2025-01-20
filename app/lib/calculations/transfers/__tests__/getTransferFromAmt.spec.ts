import { getTransferFromAmt } from "../getTransferFromAmt"
import { Transfer } from "../../../data/schema/config"

describe("getTransferFromAmt", () => {
  it("should calculate the transfer amount correctly with positive values", () => {
    const transfer: Transfer = { transferPercent: 10 }
    const prevValue = 1000
    const result = getTransferFromAmt(transfer, prevValue)
    expect(result).toBe(100)
  })

  it("should calculate the transfer amount correctly with zero percent", () => {
    const transfer: Transfer = { transferPercent: 0 }
    const prevValue = 1000
    const result = getTransferFromAmt(transfer, prevValue)
    expect(result).toBe(0)
  })

  it("should calculate the transfer amount correctly with negative values", () => {
    const transfer: Transfer = { transferPercent: -10 }
    const prevValue = 1000
    const result = getTransferFromAmt(transfer, prevValue)
    expect(result).toBe(-100)
  })

  it("should calculate the transfer amount correctly with zero previous value", () => {
    const transfer: Transfer = { transferPercent: 10 }
    const prevValue = 0
    const result = getTransferFromAmt(transfer, prevValue)
    expect(result).toBe(0)
  })

  it("should calculate the transfer amount correctly with fractional percent", () => {
    const transfer: Transfer = { transferPercent: 12.5 }
    const prevValue = 1000
    const result = getTransferFromAmt(transfer, prevValue)
    expect(result).toBe(125)
  })
})
