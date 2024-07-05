import { CashSchema, ScenarioSchema, Transfer } from "@/app/lib/data/schema/config"
import { generateMock } from "@anatine/zod-mock"
import { AuBank } from "../../assets/AuBank"
import { getFullTransfers, getPartialTransfers } from "../transferUtils"

describe("test partial transfers", () => {
  const year = 2030

  const mockScenarioConfig = generateMock(ScenarioSchema)

  const mockCashConfig1 = generateMock(CashSchema)
  mockCashConfig1.value = 100000
  const cashAsset1 = new AuBank(mockCashConfig1, year, mockScenarioConfig)
  const mockCashConfig2 = generateMock(CashSchema)
  mockCashConfig2.value = 100000
  const cashAsset2 = new AuBank(mockCashConfig2, year, mockScenarioConfig)

  it("should get correct transfer for partial transfer in", () => {
    const transfersForYear: Transfer[] = [
      { id: "a", year, from: cashAsset2.id, to: cashAsset1.id, value: 50000, migrateAll: false, costOfTransfer: 10000 }
    ]

    const result = getPartialTransfers(transfersForYear, cashAsset1.id)

    expect(result).toBe(40000)
  })
})

describe("test full transfers", () => {
  const startingYear = 2024
  const year = 2030

  const mockScenarioConfig = generateMock(ScenarioSchema)

  const mockCashConfig1 = generateMock(CashSchema)
  mockCashConfig1.value = 100000
  const cashAsset1 = new AuBank(mockCashConfig1, startingYear, mockScenarioConfig)
  const mockCashConfig2 = generateMock(CashSchema)
  mockCashConfig2.value = 100000
  const cashAsset2 = new AuBank(mockCashConfig2, startingYear, mockScenarioConfig)
  const mockCashConfig3 = generateMock(CashSchema)
  mockCashConfig3.value = 100000
  const cashAsset3 = new AuBank(mockCashConfig3, startingYear, mockScenarioConfig)

  const assets = [cashAsset1, cashAsset2, cashAsset3]

  it("should get correct transfer for full transfer out", () => {
    const prevValue = 20000
    const transfersForYear: Transfer[] = [
      { id: "a", year: year, from: cashAsset1.id, to: cashAsset2.id, migrateAll: true }
    ]

    const result = getFullTransfers(transfersForYear, cashAsset1.id, assets, prevValue, year)

    expect(result).toBe(-20000)
  })

  it("should get correct transfer for full transfer in", () => {
    const transfersForYear: Transfer[] = [{ id: "a", year, from: cashAsset2.id, to: cashAsset1.id, migrateAll: true }]
    const prevValue = 20000
    const prevYear = year

    cashAsset2.history.push({ year: prevYear, value: prevValue, income: 0 })

    const result = getFullTransfers(transfersForYear, cashAsset1.id, assets, prevValue, prevYear)

    expect(result).toBe(20000)
  })

  it("should get correct transfer for multiple full transfers in", () => {
    const transfersForYear: Transfer[] = [
      { id: "a", year, from: cashAsset2.id, to: cashAsset1.id, migrateAll: true, costOfTransfer: 100 },
      { id: "b", year, from: cashAsset3.id, to: cashAsset1.id, migrateAll: true, costOfTransfer: 200 }
    ]
    const prevValue = 20000
    const prevYear = year

    cashAsset2.history.push({ year: prevYear, value: prevValue, income: 0 })
    cashAsset3.history.push({ year: prevYear, value: prevValue, income: 0 })

    const result = getFullTransfers(transfersForYear, cashAsset1.id, assets, prevValue, prevYear)

    expect(result).toBe(39700)
  })

  it("should throw error when full transfer into and out of the same asset", () => {
    const transfersForYear: Transfer[] = [
      { id: "a", year, from: cashAsset2.id, to: cashAsset1.id, migrateAll: true, costOfTransfer: 100 },
      { id: "b", year, from: cashAsset1.id, to: cashAsset3.id, migrateAll: true, costOfTransfer: 200 }
    ]
    const prevValue = 20000
    const prevYear = year

    cashAsset2.history.push({ year: prevYear, value: prevValue, income: 0 })
    cashAsset3.history.push({ year: prevYear, value: prevValue, income: 0 })

    expect(() => getFullTransfers(transfersForYear, cashAsset1.id, assets, prevValue, prevYear)).toThrow(
      "Cannot have a full transfer into and out of the same asset"
    )
  })

  it("should throw error when > 1 full transfer out of an asset", () => {
    const transfersForYear: Transfer[] = [
      { id: "a", year, from: cashAsset2.id, to: cashAsset1.id, migrateAll: true, costOfTransfer: 100 },
      { id: "b", year, from: cashAsset2.id, to: cashAsset3.id, migrateAll: true, costOfTransfer: 200 }
    ]
    const prevValue = 20000
    const prevYear = year

    cashAsset2.history.push({ year: prevYear, value: prevValue, income: 0 })
    cashAsset3.history.push({ year: prevYear, value: prevValue, income: 0 })

    expect(() => getFullTransfers(transfersForYear, cashAsset2.id, assets, prevValue, prevYear)).toThrow(
      "Cannot do 2 full transfers from 1 asset"
    )
  })
})
