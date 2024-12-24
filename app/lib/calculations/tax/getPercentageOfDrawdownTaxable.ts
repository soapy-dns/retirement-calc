import { Country } from "../../data/schema/config"
import { AssetGroup } from "../types"

const ukCountrys = ["SC", "NI", "EN", "WA"]

// this should be configurable
export const getPercentageOfDrawdownTaxable = (
  taxResident: Country,
  assetCountry: Country = "AU",
  assetClass: AssetGroup
) => {
  // if (assetClass === AssetGroup.super && assetCountry === "AU" && taxResident === "AU") {
  //   return 0
  // }
  // it doesn't matter if au or uk pension, if you are resident in UK only 25% is tax free.
  if (assetClass === AssetGroup.super && ukCountrys.includes(taxResident)) {
    return 75
  }

  return 0
}
