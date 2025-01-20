import { Transfer } from "@/app/lib/data/schema/config"
import { verifyNotTransferringMoreThan100Percent } from "../../validation/verifyNotTransferringMoreThan100Percent"

describe("verifyNotTransferringMoreThan100Percent", () => {
  it("should return false when no transfers exist", () => {
    const formData = {
      from: "account1",
      year: 2023,
      transferCostType: "fixed",
      transferPercent: 50,
      transferCostValue: 1000
    }
    const result = verifyNotTransferringMoreThan100Percent(formData, [])
    expect(result).toBe(true)
  })

  it("should return false when total transfer percent is less than 100", () => {
    const formData = {
      from: "account1",
      year: 2023,
      transferCostType: "fixed",
      transferPercent: 49,
      transferCostValue: 1000
    }
    const transfers: Transfer[] = [
      { from: "account1", year: 2023, transferPercent: 30 },
      { from: "account1", year: 2023, transferPercent: 20 }
    ]
    const result = verifyNotTransferringMoreThan100Percent(formData, transfers)
    expect(result).toBe(true)
  })

  it("should return true when total transfer percent is exactly 100", () => {
    const formData = {
      from: "account1",
      year: 2023,
      transferCostType: "fixed",
      transferPercent: 1,
      transferCostValue: 1000
    }
    const transfers: Transfer[] = [
      { from: "account1", year: 2023, transferPercent: 49 },
      { from: "account1", year: 2023, transferPercent: 50 }
    ]
    const result = verifyNotTransferringMoreThan100Percent(formData, transfers)
    expect(result).toBe(true)
  })

  it("should return true when total transfer percent is more than 100", () => {
    const formData = {
      from: "account1",
      year: 2023,
      transferCostType: "fixed",
      transferPercent: 1,
      transferCostValue: 1000
    }
    const transfers: Transfer[] = [
      { from: "account1", year: 2023, transferPercent: 50 },
      { from: "account1", year: 2023, transferPercent: 50 }
    ]
    const result = verifyNotTransferringMoreThan100Percent(formData, transfers)
    expect(result).toBe(false)
  })

  it("should return false when transfers are from different accounts", () => {
    const formData = {
      from: "account1",
      year: 2023,
      transferCostType: "fixed",
      transferPercent: 50,
      transferCostValue: 1000
    }
    const transfers: Transfer[] = [
      { from: "account2", year: 2023, transferPercent: 60 },
      { from: "account3", year: 2023, transferPercent: 50 }
    ]
    const result = verifyNotTransferringMoreThan100Percent(formData, transfers)
    expect(result).toBe(true)
  })
})
