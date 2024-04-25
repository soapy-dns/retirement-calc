import { getPercDrawdownTaxable, getTaxableDrawdownAmt } from "../utils"
import * as assetUtilsService from "../../assets/assetUtils"
import { AssetGroup } from "../../types"

const scenarioId = "xxx"
const owner = "him"
describe("", () => {
  it("should have 0% taxable if residency and asset countries both Australia", () => {
    const result = getPercDrawdownTaxable("AU", "AU", AssetGroup.super)
    expect(result).toBe(0)
  })

  it("should have 0% taxable if residency and asset countries both Scotland", () => {
    const result = getPercDrawdownTaxable("SC", "SC", AssetGroup.super)
    expect(result).toBe(75)
  })

  it("should have 100% taxable if residency = AU and asset country = SC", () => {
    const result = getPercDrawdownTaxable("AU", "SC", AssetGroup.super)
    expect(result).toBe(100)
  })
  it("should have 100% taxable if residency = SC and asset country = AU", () => {
    const result = getPercDrawdownTaxable("SC", "AU", AssetGroup.super)
    expect(result).toBe(100)
  })
  it("should have 0% taxable if residency = SC and asset country = AU, but not super", () => {
    const result = getPercDrawdownTaxable("SC", "AU", AssetGroup.cash)
    expect(result).toBe(0)
  })
})

describe("getTaxableDrawdownAmt", () => {})
