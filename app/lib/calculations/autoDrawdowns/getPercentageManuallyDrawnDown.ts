import { isSuperAsset } from "@/app/ui/utils"
import { Asset } from "../assets/Asset"
import { Transfer } from "../../data/schema/config"

// if not going to another super fund, then this is a manual drawdown
const isManualDrawdown = (transferToId: string, assets: Asset[]): boolean => {
  const assetTo = assets.find((it) => it.id === transferToId)
  if (assetTo && !isSuperAsset(assetTo.className)) {
    return true
  }
  return false
}

export const getPercentageManuallyDrawnDown = (assetId: string, transfers: Transfer[], assets: Asset[]): number => {
  const totalPercentageDrawnDown = transfers.reduce((accum, transfer) => {
    if (transfer.from === assetId) {
      if (isManualDrawdown(transfer.to, assets)) {
        return accum + transfer.transferPercent
      }
    }
    return accum
  }, 0)
  return totalPercentageDrawnDown
}
