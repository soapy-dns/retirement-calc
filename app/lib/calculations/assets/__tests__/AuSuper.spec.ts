import { AuSuper } from "../AuSuper"
import { AssetGroup } from "@/app/lib/calculations/types"
import { IAsset, IScenario, SuperContext, Transfer } from "../../../data/schema/config"
import { YearData } from "../types"
import * as getNetTransferAmtForYearModule from "../../transfers/getNetTransferAmtForYear"

jest.mock("../../transfers/getNetTransferAmtForYear")

describe("AuSuper", () => {
  const mockAssetConfig: IAsset = {
    className: "AuSuper",
    value: 100000,
    country: "AU"
  }

  const mockSuperContext: SuperContext = {
    investmentReturn: 0.05 // 5%
  }

  const mockScenario: IScenario = {
    transfers: [],
    context: {
      taxResident: true,
      superAu: mockSuperContext
    }
  }
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should initialize correctly", () => {
    const auSuper = new AuSuper(mockAssetConfig, 2023, mockScenario)
    expect(auSuper.capitalAsset).toBe(true)
    expect(auSuper.assetGroup).toBe(AssetGroup.super)
    expect(auSuper.percOfIncomeTaxable).toBeDefined()
    expect(auSuper.percOfDrawdownTaxable).toBeDefined()
    expect(auSuper.transfers).toEqual([])
    expect(auSuper.superContext).toEqual(mockSuperContext)
    expect(auSuper.history).toEqual([{ value: 100000, year: 2023, transferAmt: 0, income: 0 }])
  })

  it("should calculate next year data correctly", () => {
    getNetTransferAmtForYearModule.getNetTransferAmtForYear.mockReturnValue(-1000) // transfering $1000 OUT (-ve)

    const auSuper = new AuSuper(mockAssetConfig, 2023, mockScenario)
    const yearData: YearData = { value: 100000, year: 2023 }
    const nextYearData = auSuper.calcNextYear(yearData, [])
    console.log("nextYearData", nextYearData)

    expect(nextYearData.year).toBe(2024)
    expect(nextYearData.value).toBe(103274)
    expect(nextYearData.income).toBe(5028)
    expect(nextYearData.transferAmt).toBe(-1000) // from mock
    expect(nextYearData.taxOnIncome).toBe(754)
  })

  it("should throw error for invalid config", () => {
    const invalidConfig = { ...mockAssetConfig, className: "InvalidClass" }
    expect(() => new AuSuper(invalidConfig, 2023, mockScenario)).toThrow("Invalid config for Super")
  })

  it("should return correct asset class", () => {
    const auSuper = new AuSuper(mockAssetConfig, 2023, mockScenario)
    expect(auSuper.getAssetClass()).toBe(AssetGroup.super)
  })
})
