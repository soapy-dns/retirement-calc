import { getPercDrawdownTaxable, getTaxableDrawdownAmt } from "../utils"
import * as assetUtilsService from "../../assets/assetUtils"
import { AssetClass } from "../../types"

const scenarioId = "xxx"
const owner = "him"
describe("", () => {
  it("should have 0% taxable if residency and asset countries both Australia", () => {
    const result = getPercDrawdownTaxable("AU", "AU", AssetClass.super)
    expect(result).toBe(0)
  })

  it("should have 0% taxable if residency and asset countries both Scotland", () => {
    const result = getPercDrawdownTaxable("SC", "SC", AssetClass.super)
    expect(result).toBe(75)
  })

  it("should have 100% taxable if residency = AU and asset country = SC", () => {
    const result = getPercDrawdownTaxable("AU", "SC", AssetClass.super)
    expect(result).toBe(100)
  })
  it("should have 100% taxable if residency = SC and asset country = AU", () => {
    const result = getPercDrawdownTaxable("SC", "AU", AssetClass.super)
    expect(result).toBe(100)
  })
  it("should have 0% taxable if residency = SC and asset country = AU, but not super", () => {
    const result = getPercDrawdownTaxable("SC", "AU", AssetClass.cash)
    expect(result).toBe(0)
  })
})

describe("getTaxableDrawdownAmt", () => {
  it.skip("should add value to accumlated total", () => {
    const automatedDrawdownsForYear = [{ from: "HIS_BANK", to: "DRAWDOWN", value: 1000, assetOwner: owner }]
    assetUtilsService.getAssetWithMatchingName.mockReturnValue({ assetOwner: owner, drawdownTaxed: true })
    const result = getTaxableDrawdownAmt(scenarioId, automatedDrawdownsForYear, owner)
    expect(result).toBe(automatedDrawdownsForYear[0].value)
  })
  // it("should not add value to accumlated total when no match", () => {
  //   const automatedDrawdownsForYear = [{ from: "HIS_BANK", to: "NOT_DRAWDOWN", value: 1000, assetOwner: owner }]
  //   assetUtilsService.getAssetWithMatchingName.mockReturnValue({ assetOwner: owner })
  //   const result = getTaxableDrawdownAmt(scenarioId, automatedDrawdownsForYear, owner)
  //   expect(result).toBe(0)
  // })
  // it("should not add value to accumlated total when drawdown not taxable", () => {
  //   const automatedDrawdownsForYear = [{ from: "HIS_BANK", to: "NOT_DRAWDOWN", value: 1000, assetOwner: owner }]
  //   assetUtilsService.getAssetWithMatchingName.mockReturnValue({ assetOwner: owner, drawdownTaxable: false })
  //   const result = getTaxableDrawdownAmt(scenarioId, automatedDrawdownsForYear, owner)
  //   expect(result).toBe(0)
  // })
  // it("should not add value to accumlated total when does not match owner", () => {
  //   const automatedDrawdownsForYear = [{ from: "HIS_BANK", to: "DRAWDOWN", value: 1000, assetOwner: owner }]
  //   assetUtilsService.getAssetWithMatchingName.mockReturnValue({ assetOwner: "NOT_OWNER" })
  //   const result = getTaxableDrawdownAmt(scenarioId, automatedDrawdownsForYear, owner)
  //   expect(result).toBe(0)
  // })
  // describe("getOwnersTaxableAmt", () => {
  //   it("should be 0 if no earnings for year", () => {
  //     const owner = Owner.HIM
  //     const earningsFromAssets = [
  //       {
  //         name: "TEST_NAME",
  //         owner,
  //         percOfEarningsTaxable: 0,
  //         proportion: 1,
  //         history: []
  //       }
  //     ]
  //     const year = 2023
  //     const result = getOwnersTaxableEarningsAmt(earningsFromAssets, owner, year)
  //     expect(result).toBe(0)
  //   })
  //   it("should be 0 if not taxable", () => {
  //     const owner = Owner.HIM
  //     const earningsFromAssets: Earning[] = [
  //       {
  //         name: "TEST_NAME",
  //         owner,
  //         percOfEarningsTaxable: 0,
  //         proportion: 1,
  //         history: [{ year: 2023, value: 1000 }]
  //       }
  //     ]
  //     const year = 2023
  //     const result = getOwnersTaxableEarningsAmt(earningsFromAssets, owner, year)
  //     expect(result).toBe(0)
  //   })
  //   it("should be value if taxable", () => {
  //     const value = 1000
  //     const year = 2023
  //     const owner = Owner.HIM
  //     const earningsFromAssets: Earning[] = [
  //       {
  //         name: "TEST_NAME",
  //         owner,
  //         percOfEarningsTaxable: 0,
  //         proportion: 1,
  //         history: [{ year, value }]
  //       }
  //     ]
  //     const result = getOwnersTaxableEarningsAmt(earningsFromAssets, owner, year)
  //     expect(result).toBe(0)
  //   })
  // })
})
