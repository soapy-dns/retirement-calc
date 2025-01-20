import { Transfer } from "../../data/schema/config"
import { Asset } from "../assets/Asset"
import { getTransferAmountForTransferFromAsset } from "./getTransferAmountForTransferFromAsset"

export const getTransferToAmt = (transfer: Transfer, assets: Asset[]): number => {
  const { transferCostType, transferCostValue = 0 } = transfer
  const transferFromAmt = getTransferAmountForTransferFromAsset(transfer, assets)

  switch (transferCostType) {
    case "NO_COST":
      return transferFromAmt
    // case "TODAYS_MONEY":
    //   return transferCostValue
    case "FUTURE_MONEY":
      return Math.round(transferFromAmt - transferCostValue)
    case "PERCENTAGE":
      return Math.round(transferFromAmt - (transferFromAmt * transferCostValue) / 100)
    default:
      return 0
  }
}
