import { generateMock } from "@anatine/zod-mock"
import { getNetTransferAmt } from "../getNetTransferAmt"
import { CashSchema, ScenarioSchema, Transfer, TransferSchema } from "@/app/lib/data/schema/config"
import { AuBank } from "../../assets/AuBank"

describe("test transfers", () => {
  const year = 2024
  const mockScenarioConfig = generateMock(ScenarioSchema)

  const mockCashConfig1 = generateMock(CashSchema)
  mockCashConfig1.value = 100000
  const cashAsset1 = new AuBank(mockCashConfig1, year, mockScenarioConfig)
  const mockCashConfig2 = generateMock(CashSchema)
  mockCashConfig2.value = 100000

  const cashAsset2 = new AuBank(mockCashConfig2, year, mockScenarioConfig)
  const mockCashConfig3 = generateMock(CashSchema)
  mockCashConfig3.value = 100000

  const cashAsset3 = new AuBank(mockCashConfig3, year, mockScenarioConfig)

  const assets = [cashAsset1, cashAsset2, cashAsset3]

  it("should get correct transfer for partial transfer in", () => {
    const transfers: Transfer[] = [
      { id: "a", year: 2030, from: cashAsset2.id, to: cashAsset1.id, value: 50000, migrateAll: false }
    ]

    const yearData = { year: 2030, value: 150000 }
    const result = getNetTransferAmt(cashAsset1.id, yearData, transfers, assets)

    expect(result).toBe(50000)
  })

  it("should get correct transfer for partial transfer out", () => {
    const transfers: Transfer[] = [
      { id: "a", year: 2030, from: cashAsset1.id, to: cashAsset2.id, value: 50000, migrateAll: false }
    ]

    const yearData = { year: 2030, value: 150000 }
    const result = getNetTransferAmt(cashAsset1.id, yearData, transfers, assets)

    expect(result).toBe(-50000)
  })

  it("should not error when transfers out > value", () => {
    const transfers: Transfer[] = [
      { id: "a", year: 2030, from: cashAsset1.id, to: cashAsset2.id, value: 200000, migrateAll: false }
    ]

    const yearData = { year: 2030, value: 150000 }
    const result = getNetTransferAmt(cashAsset1.id, yearData, transfers, assets)

    expect(result).toBe(-200000)
  })

  it("should correctly calculate a full transfer out", () => {
    const transfers: Transfer[] = [{ id: "a", year: 2030, from: cashAsset1.id, to: cashAsset2.id, migrateAll: true }]

    const yearData = { year: 2030, value: 150000 }
    const result = getNetTransferAmt(cashAsset1.id, yearData, transfers, assets)

    expect(result).toBe(-150000)
  })

  it("should correctly calculate a full transfer in", () => {
    const transfers: Transfer[] = [{ id: "a", year: 2030, from: cashAsset1.id, to: cashAsset2.id, migrateAll: true }]

    cashAsset1.history.push({ year: 2030, value: 20000, income: 0 }) // should use value from this

    const yearData = { year: 2030, value: 150000 }
    const result = getNetTransferAmt(cashAsset2.id, yearData, transfers, assets)

    expect(result).toBe(20000)
  })

  it("should correctly calculate with 2 partial transfers out", () => {
    const transfers: Transfer[] = [
      { id: "a", year: 2030, from: cashAsset1.id, to: cashAsset2.id, value: 10000, migrateAll: false },
      { id: "b", year: 2030, from: cashAsset1.id, to: cashAsset3.id, value: 10000, migrateAll: false }
    ]

    const yearData = { year: 2030, value: 150000 }
    const result = getNetTransferAmt(cashAsset1.id, yearData, transfers, assets)

    expect(result).toBe(-20000)
  })

  it("should correctly calculate with 2 partial transfers in", () => {
    const transfers: Transfer[] = [
      { id: "a", year: 2030, from: cashAsset2.id, to: cashAsset1.id, value: 10000, migrateAll: false },
      { id: "b", year: 2030, from: cashAsset3.id, to: cashAsset1.id, value: 10000, migrateAll: false }
    ]

    const yearData = { year: 2030, value: 150000 }
    const result = getNetTransferAmt(cashAsset1.id, yearData, transfers, assets)

    expect(result).toBe(20000)
  })

  it("should correctly calculate with 1 partial transfers out, and 1 full (remaining) transfer out", () => {
    const transfers: Transfer[] = [
      { id: "a", year: 2030, from: cashAsset1.id, to: cashAsset2.id, value: 10000, migrateAll: false },
      { id: "b", year: 2030, from: cashAsset1.id, to: cashAsset3.id, migrateAll: true }
    ]

    const yearData = { year: 2030, value: 150000 }
    const result = getNetTransferAmt(cashAsset1.id, yearData, transfers, assets)

    expect(result).toBe(-150000)
  })

  // TODO: reinstate
  //   it.skip("should correctly calculate with 1 partial transfer in, and 1 full transfer in", () => {
  //     const transfers: Transfer[] = [
  //       { id: "a", year: 2030, from: cashAsset2.id, to: cashAsset1.id, value: 10000, migrateAll: false },
  //       { id: "b", year: 2030, from: cashAsset2.id, to: cashAsset3.id, migrateAll: true }
  //     ]

  //     const yearData = { year: 2030, value: 150000 }
  //     const resultForAsset1 = getNetTransferAmt(cashAsset1.id, yearData, transfers, assets)

  //     expect(resultForAsset1).toBe(10000)

  //     const resultForAsset3 = getNetTransferAmt(cashAsset3.id, yearData, transfers, assets)

  //     console.log("--resultForAsset3--", resultForAsset3)

  //     expect(resultForAsset3).toBe(10000)
  //   })
})
