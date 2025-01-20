import { Transfer } from "../../data/schema/config"
import { Asset } from "../assets/Asset"
import { getTransferFromAmt } from "./getTransferFromAmt"
import { getValueOfAssetAtYear } from "./getValueOfAssetAtYear"

export const getTransferAmountForTransferFromAsset = (transfer: Transfer, assets: Asset[]): number => {
  const fromAsset = assets.find((asset) => asset.id === transfer.from)
  if (!fromAsset) throw new Error("Matching asset not found for transfer")

  const valueOfFromAssetAtYear = getValueOfAssetAtYear(fromAsset, transfer.year)

  const transferFromAmt = getTransferFromAmt(transfer, valueOfFromAssetAtYear)

  return transferFromAmt
}
