import { AuSuper } from "./AuSuper"
import { AuDefinedBenefits } from "./AuDefinedBenefits"
import { AuBank } from "./AuBank"
import { AuShares } from "./AuShares"
import { AuProperty } from "./AuProperty"
import { Asset } from "./Asset"
import { getDrawdownableAssets } from "../autoDrawdowns/getDrawdownableAssets"
import { sortByPreference } from "../utils/sortAssetsByPreference"
import { groupAssetsByPreference } from "./groupAssetsByPreference"
import { AssetIncome } from "./types"
import { InflationContext } from "@/app/lib/calculations/types"
import { Salary } from "./Salary"
import { getAssetData } from "../../data/scenarios"
import { IAsset, IScenario } from "../../data/schema/config"

export const buildInitialAssets = (
  startingYear: number,
  scenario: IScenario,
  inflationContext: InflationContext
): Asset[] => {
  const { assets: assetsData } = scenario

  // TODO: don't need to pass startingYear down.  Probably shouldn't have to pass scenario
  return assetsData.map((assetConfig: IAsset) => {
    const { className, ...options } = assetConfig
    switch (className) {
      case "AuBank":
        return new AuBank(assetConfig, startingYear, scenario)
      case "AuSuper":
        return new AuSuper(assetConfig, startingYear, scenario)
      case "AuDefinedBenefits":
        return new AuDefinedBenefits(assetConfig, startingYear, scenario, inflationContext)
      case "Salary":
        return new Salary(assetConfig, startingYear, scenario, inflationContext)
      case "AuShares":
        return new AuShares(assetConfig, startingYear, scenario)
      case "AuProperty":
        return new AuProperty(assetConfig, startingYear, scenario, inflationContext)
      default:
        // maybe should have a default which is the same next year
        throw new Error(`Unknown asset ${className}`)
    }
  })
}

// TODO: I think this is only being used by tests
export const getAssetWithMatchingName = (scenario: IScenario, assetName: string) => {
  return getAssetData(scenario, assetName)
}

export const getGroupedDrawdownableAssets = (year: number, assets: Asset[]) => {
  const drawdownableAssets = getDrawdownableAssets(assets, year)

  drawdownableAssets.forEach((it) => it.name)

  const sortedByPreference = sortByPreference(drawdownableAssets)

  return groupAssetsByPreference(sortedByPreference)
}

export const canDrawdownAssets = (assets: Asset[], year: number) => {
  const drawdownableAmount = assets.reduce((accum, asset: Asset) => {
    if (asset.canDrawdown) {
      const history = asset.history.find((it) => it.year === year)

      return history ? accum + history.value : accum
    }
    return accum
  }, 0)

  return drawdownableAmount > 0
}

// for each asset calculate the next year minus any tax
export const addAssetIncome = (year: number, assets: Asset[], incomeFromAssets: AssetIncome[]) => {
  assets.forEach((asset) => {
    const yearData = asset.getYearData(year)

    const nextYearData = asset.calcNextYear(yearData, assets)

    // GET INCOME FOR THIS ASSET - NOTE THERE COULD BE MULTIPLE AS THERE COULD BE MULTIPLE OWNERS OF THE ASSET
    // CALCULATE INCOME FROM ASSETS FOR THE YEAR AND MATCHING ASSET
    // THIS IS USED FOR TAX CALCULATIONS
    const matchingIncomeForOwners = incomeFromAssets.filter((incomeStream) => asset.id === incomeStream.id)

    // add a history
    matchingIncomeForOwners.forEach((ownersIncome) => {
      const allocatedIncome = nextYearData.income * ownersIncome.proportion
      ownersIncome.history.push({ year, value: Math.round(allocatedIncome) })
    })
  })
}
