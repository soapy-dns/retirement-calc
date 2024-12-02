import { getRandomKey } from "../../utils/getRandomKey"
import { Asset } from "../assets/Asset"
import { Constants } from "../constants"
import { AutomatedDrawdown } from "./types"

const getYearData = (asset: Asset, year: number) => asset.history.find((it) => it.year === year + 1) // next history - for manipulating it

const getSortedByAmtAvailable = (assets: Asset[], year: number): Asset[] => {
  const mappedAssets = assets.map((asset) => {
    const yearData = getYearData(asset, year)
    return {
      amtCanRemove: yearData ? yearData.value - asset.preferredMinAmt : 0,
      asset
    }
  })

  const sortedMappedAssets = mappedAssets.sort((a, b) => {
    if (a.amtCanRemove > b.amtCanRemove) return 1
    if (a.amtCanRemove < b.amtCanRemove) return -1
    return 0
  })

  const sortedAssets = sortedMappedAssets.map((it) => it.asset)

  return sortedAssets
}

/**
 * There are a bunch of expenses which need to come from somewhere
 * (and go out the system eg living expenses and taxes)
 * They need to come from somewhere, so we automate drawdowns of assets
 * Automated drawdowns are just transfers but going to DRAWDOWN.
 *
 * This function does the drawdowns, and returns the details
 *
 * Groups them by assets to draw down on first.  eg uk bank may be 1 group on its own
 * au super might be another group
 *
 * Within that group, just go through them 1 at a time taking off what is required.
 * This does mean that we will use all of one asset before moving onto another.
 * It might look nicer to split 50:50 (or whatever) but the calculation should be the same
 *
 */
export const createAutoDrawdowns = (
  year: number,
  groupedAssets: Asset[][],
  amountToDrawdown: number
): AutomatedDrawdown[] => {
  const automatedDrawdowns: AutomatedDrawdown[] = []

  let stillToDrawdownAmt = amountToDrawdown

  if (stillToDrawdownAmt) {
    // preference of drawdown
    groupedAssets.forEach((assets: Asset[]) => {
      if (stillToDrawdownAmt > 0) {
        const sortedByAmtAvailable = getSortedByAmtAvailable(assets, year)

        // divide the amount still to drawdown by the number of assets still to process
        // take that amount, or the max possible from this asset
        // repeat

        sortedByAmtAvailable.forEach((asset: Asset, index) => {
          const numAssetsStillToProcess = assets.length - index
          const averageToRemoveFromEachAsset = stillToDrawdownAmt / numAssetsStillToProcess

          const nextHistory = asset.history.find((it) => it.year === year + 1) // next history - for manipulating it
          if (!nextHistory) throw new Error(`history cannot be found ${asset.name}, ${year}`)

          const amtCanRemove = nextHistory.value > asset.preferredMinAmt ? nextHistory.value - asset.preferredMinAmt : 0

          const amountToRemove =
            amtCanRemove > averageToRemoveFromEachAsset
              ? Math.round(averageToRemoveFromEachAsset)
              : Math.round(amtCanRemove)

          nextHistory.value = nextHistory.value - amountToRemove // TODO: not here - could be taxed

          if (amountToRemove > 0) {
            automatedDrawdowns.push({
              id: getRandomKey(),
              year,
              from: asset.id,
              fromName: asset.name,
              to: Constants.DRAWDOWN,
              value: amountToRemove,
              migrateAll: false
              // taxableDrawdownAmt: (amountToDrawdown * asset.percOfIncomeTaxable) / 100
            })

            const thisYearsHistory = asset.history.find((it) => it.year === year)
            if (thisYearsHistory) thisYearsHistory.automatedAssetDrawdownAmt = amountToRemove

            stillToDrawdownAmt = stillToDrawdownAmt - amountToRemove
          }
        })
      }
    })
  }
  return automatedDrawdowns
}
