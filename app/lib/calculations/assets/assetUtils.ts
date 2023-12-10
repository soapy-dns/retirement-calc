import { AuSuper } from "./AuSuper"
import { AuDefinedBenefits } from "./AuDefinedBenefits"
import { AuBank } from "./AuBank"
import { AuShares } from "./AuShares"
import { AuProperty } from "./AuProperty"
import { Asset } from "./Asset"
import { getDrawdownableAssets } from "../autoDrawdowns/getDrawdownableAssets"
import { sortByPreference } from "../utils/sortAssetsByPreference"
import { groupAssetsByPreference } from "./groupAssetsByPreference"
import { getAssetData } from "../../data/scenarios"
import { Earning } from "./types"
import { IScenario } from "../../data/types"
import { InflationContext } from "@/app/lib/calculations/types"
import { Salary } from "./Salary"

export const buildInitialAssets = (
  startingYear: number,
  scenario: IScenario,
  inflationContext: InflationContext
): Asset[] => {
  const { assets: assetsData } = scenario

  return assetsData.map((data) => {
    const { className, ...options } = data
    switch (className) {
      case "AuBank":
        return new AuBank({ ...options, startingYear, scenario })
      case "AuSuper":
        return new AuSuper({ ...options, startingYear, scenario })
      case "AuDefinedBenefits":
        return new AuDefinedBenefits({ ...options, startingYear, scenario }, inflationContext)
      case "Salary":
        return new Salary({ ...options, startingYear, scenario }, inflationContext)
      case "AuShares":
        return new AuShares({ ...options, startingYear, scenario })
      case "AuProperty":
        return new AuProperty({ ...options, startingYear, scenario }, inflationContext)
      default:
        // maybe should have a default which is the same next year
        throw new Error(`Unknown asset ${className}`)
    }
  })
}

export const getAssetWithMatchingName = (scenario: IScenario, assetName: string) => {
  return getAssetData(scenario, assetName)
}

export const getGroupedAssets = (year: number, assets: Asset[]) => {
  // some assets cannot be drawndown eg property
  const drawdownableAssets = getDrawdownableAssets(assets, year)

  const sortedByPreference = sortByPreference(drawdownableAssets)

  return groupAssetsByPreference(sortedByPreference)
}

// TODO: unit test
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
export const addAssetEarnings = (year: number, assets: Asset[], earningsFromAssets: Earning[]) => {
  assets.forEach((asset) => {
    const yearData = asset.getYearData(year) // TODO: should maybe have this within the calcNextYear method

    const nextYearData = asset.calcNextYear(yearData, assets)

    // GET EARNINGs FOR THIS ASSET - NOTE THERE COULD BE MULTIPLE AS THERE COULD BE MULTIPLE OWNERS OF THE ASSET
    // CALCULATE 'EARNINGS' / INCOME FROM ASSETS FOR THE YEAR AND MATCHING ASSET
    // THIS IS USED FOR TAX CALCULATIONS
    const matchingEarningsForOwners = earningsFromAssets.filter((earningStream) => asset.id === earningStream.id)

    // add a history
    matchingEarningsForOwners.forEach((ownersEarnings) => {
      const allocatedIncome = nextYearData.income * ownersEarnings.proportion
      ownersEarnings.history.push({ year, value: Math.round(allocatedIncome) })
    })
  })
}
