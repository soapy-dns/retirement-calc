import { isSuperAsset } from "@/app/ui/utils"
import { Country, OwnersType } from "../../data/schema/config"
import { Asset } from "../assets/Asset"
import { AutomatedDrawdown } from "./types"
import config from "@/app/lib/config.json"
import { getRandomKey } from "../../utils/getRandomKey"
import { Constants } from "../constants"

// type MandatoryDrawdownPercentageByYear = Record<number, number>
interface MandatoryDrawdownPercentageForYear {
  ageTo: number
  percentage: number
}
type MandatoryDrawdownPercentages = Partial<Record<Country, MandatoryDrawdownPercentageForYear[]>>

const { mandatoryDrawdownPercentages }: { mandatoryDrawdownPercentages: MandatoryDrawdownPercentages } = config

interface Props {
  assets: Asset[]
  year: number
  owners: OwnersType
}

// Some assets need to have a certain % drawn down each year eg au super is 4% a year
export const getMandatedDrawdowns = ({ assets, owners, year }: Props): AutomatedDrawdown[] => {
  const filteredAssets = assets.filter((asset) => {
    const { country, className } = asset
    if (mandatoryDrawdownPercentages[country] && isSuperAsset(className)) return true
  })

  const results = filteredAssets.map((asset) => {
    const { ownerIds, country } = asset

    const assetOwner = owners.find((it) => it.identifier === ownerIds[0]) // only one owner for super
    const birthYear = assetOwner?.birthYear || 0
    const roughAge = year - birthYear

    const drawdownPercent = mandatoryDrawdownPercentages[country]?.find((it) => roughAge < it.ageTo)?.percentage || 0

    const value = asset.history.find((it) => it.year === year)?.value || 0

    const amountToDrawdown = value * (drawdownPercent / 100)

    const automatedDrawdown = {
      id: getRandomKey(),
      year,
      from: asset.id,
      fromName: asset.name,
      to: Constants.DRAWDOWN,
      value: amountToDrawdown,
      migrateAll: false
    } as AutomatedDrawdown // without this, it infers migrateAll as boolean
    return automatedDrawdown
  })

  return results
}
