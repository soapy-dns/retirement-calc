import { OwnersType, Transfer } from "../../data/schema/config"
import { Asset } from "../assets/Asset"
import { AutomatedDrawdown, MandatoryDrawdownPercentages } from "./types"
import config from "@/app/lib/config.json"
import { getRandomKey } from "../../utils/getRandomKey"
import { Constants } from "../constants"
import { getSuperAssetsRelevantForDrawdown } from "./getSuperAssetsRelevantForDrawdown"
import { isSuperAsset } from "@/app/ui/utils"
import { getPercentageManuallyDrawnDown } from "./getPercentageManuallyDrawnDown"
import { log } from "console"

const { mandatoryDrawdownPercentages }: { mandatoryDrawdownPercentages: MandatoryDrawdownPercentages } = config

const DEFAULT_AGE = 65

interface Props {
  assets: Asset[]
  transfers?: Transfer[]
  year: number
  owners: OwnersType
}
/*
// https://www.ato.gov.au/tax-rates-and-codes/key-superannuation-rates-and-thresholds/payments-from-super
// Note: config use 'ageTo'
 Some assets need to have a certain % drawn down each year eg au super is 4% a year, but only when taking an income stream,
 and only if not enough has been withdrawn 'manually' via configuring a transfer.
*/
export const getMandatedDrawdowns = ({ assets, year, owners, transfers = [] }: Props): AutomatedDrawdown[] => {
  const filteredAssets = getSuperAssetsRelevantForDrawdown({ assets, year, mandatoryDrawdownPercentages })
  // console.log(
  //   "-filteredAssets----",
  //   filteredAssets.map((it) => it.name)
  // )

  const transfersForYear = transfers.filter((it) => it.year === year)

  // going to need to use reduce as some mandatory drawdowns may not be necessar
  const automatedDrawdowns = filteredAssets.reduce((accum, asset) => {
    const { ownerIds, country } = asset

    const assetOwner = owners.find((it) => it.identifier === ownerIds[0]) // only one owner for super
    const birthYear = assetOwner?.birthYear || year - DEFAULT_AGE
    const roughAge = year - birthYear

    const mandatoryDrawdownPercent =
      mandatoryDrawdownPercentages[country]?.find((it) => roughAge < it.ageTo)?.percentage || 0

    const percentageManuallyDrawnDown = getPercentageManuallyDrawnDown(asset.id, transfersForYear, assets)
    // if ([2025, 2026].includes(year)) {
    //   console.log("asset name", asset.name)

    //   log(`percentageManuallyDrawnDown: ${year} ${percentageManuallyDrawnDown} drawdownPercent: ${drawdownPercent}`)
    // }

    // if have already got manual drawdowns / transfer% > the mandatory percentage, ignore this asset
    if (percentageManuallyDrawnDown >= mandatoryDrawdownPercent) return accum

    const diff = percentageManuallyDrawnDown - mandatoryDrawdownPercent
    const percentageToDrawdown = diff > 0 ? diff : mandatoryDrawdownPercent

    const valueOfAsset = asset.history.find((it) => it.year === year)?.value || 0

    const amountToDrawdown = valueOfAsset * (percentageToDrawdown / 100)
    // if ([2025, 2026].includes(year)) {
    //   log(`valueOfAsset: ${valueOfAsset}`)
    //   log(`amountToDrawdown: ${asset.name} ${amountToDrawdown}`)
    // }

    const automatedDrawdown = {
      id: getRandomKey(),
      year,
      from: asset.id,
      fromName: asset.name,
      to: Constants.DRAWDOWN,
      value: Math.round(amountToDrawdown),
      migrateAll: false
    } as AutomatedDrawdown // without this, it infers migrateAll as boolean

    accum.push(automatedDrawdown)
    return accum
  }, [] as AutomatedDrawdown[])

  return automatedDrawdowns
}
