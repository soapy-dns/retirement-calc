import { isSuperAsset } from "@/app/ui/utils"
import { Asset } from "../assets/Asset"
import { MandatoryDrawdownPercentages } from "./types"

interface Props {
  assets: Asset[]
  year: number
  mandatoryDrawdownPercentages: MandatoryDrawdownPercentages
}
export const getSuperAssetsRelevantForDrawdown = ({ assets, year, mandatoryDrawdownPercentages }: Props): Asset[] => {
  const filteredAssets = assets.filter((asset) => {
    const { country, className, drawdownFrom } = asset
    if (drawdownFrom && year < drawdownFrom) return false
    if (mandatoryDrawdownPercentages[country] && isSuperAsset(className)) return true
    return false
  })

  return filteredAssets
}
