import { getPercentageOfDrawdownTaxable } from "../getPercentageOfDrawdownTaxable"
import { Country } from "../../../data/schema/config"
import { AssetGroup } from "../../types"

describe("getPercentageOfDrawdownTaxable", () => {
  it("should return 75 when asset class is super and tax resident is in UK", () => {
    const result = getPercentageOfDrawdownTaxable("EN" as Country, "AU" as Country, AssetGroup.super)
    expect(result).toBe(75)
  })

  it("should return 0 when asset class is not super", () => {
    const result = getPercentageOfDrawdownTaxable("EN" as Country, "AU" as Country, AssetGroup.other)
    expect(result).toBe(0)
  })

  it("should return 0 when tax resident is not in UK", () => {
    const result = getPercentageOfDrawdownTaxable("AU" as Country, "AU" as Country, AssetGroup.super)
    expect(result).toBe(0)
  })

  it("should return 0 when asset class is super and tax resident is not in UK", () => {
    const result = getPercentageOfDrawdownTaxable("US" as Country, "AU" as Country, AssetGroup.super)
    expect(result).toBe(0)
  })

  it("should return 0 when asset class is super and tax resident is in UK but asset country is not AU", () => {
    const result = getPercentageOfDrawdownTaxable("EN" as Country, "US" as Country, AssetGroup.super)
    expect(result).toBe(75)
  })
})
