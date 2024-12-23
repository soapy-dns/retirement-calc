import { getPercentageOfDrawdownTaxable } from "../getPercentageOfDrawdownTaxable"
import { Country } from "../../../data/schema/config"
import { AssetGroup } from "../../types"

describe("getPercentageOfDrawdownTaxable", () => {
  it("should return 0 for AU tax resident with AU super asset", () => {
    const result = getPercentageOfDrawdownTaxable("AU" as Country, "AU" as Country, AssetGroup.super)
    expect(result).toBe(0)
  })

  it("should return 75 for UK tax resident with super asset", () => {
    const ukCountries: Country[] = ["SC", "NI", "EN", "WA"]
    ukCountries.forEach((country) => {
      const result = getPercentageOfDrawdownTaxable(country, "AU" as Country, AssetGroup.super)
      expect(result).toBe(75)
    })
  })

  it("should return 100 for non-AU tax resident with non-super asset", () => {
    const result = getPercentageOfDrawdownTaxable("US" as Country, "AU" as Country, AssetGroup.other)
    expect(result).toBe(100)
  })

  it("should return 100 for AU tax resident with non-super asset", () => {
    const result = getPercentageOfDrawdownTaxable("AU" as Country, "AU" as Country, AssetGroup.other)
    expect(result).toBe(100)
  })

  it("should return 100 for UK tax resident with non-super asset", () => {
    const ukCountries: Country[] = ["SC", "NI", "EN", "WA"]
    ukCountries.forEach((country) => {
      const result = getPercentageOfDrawdownTaxable(country, "AU" as Country, AssetGroup.other)
      expect(result).toBe(100)
    })
  })
})
