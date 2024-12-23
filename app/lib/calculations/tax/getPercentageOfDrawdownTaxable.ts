import { Country } from "../../data/schema/config"
import { AssetGroup } from "../types"

const ukCountrys = ["SC", "NI", "EN", "WA"]

// this should be configurable
export const getPercentageOfDrawdownTaxable = (
  taxResident: Country,
  assetCountry: Country = "AU",
  assetClass: AssetGroup
) => {
  if (assetClass === AssetGroup.super && assetCountry === "AU" && taxResident === "AU") {
    return 0
  }
  if (assetClass === AssetGroup.super && ukCountrys.includes(taxResident)) {
    return 75
  }

  return 100
}
