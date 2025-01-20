import { Transfer } from "../../data/schema/config"
import { Asset } from "../assets/Asset"
import { getTransferFromAmt } from "./getTransferFromAmt"
import { getTransferToAmt } from "./getTransferToAmt"

/*
For this year, calculate the net amount that is going into or out of the asset
*/
export const getNetTransferAmtForYear = (
  year: number,
  transfers: Transfer[],
  assetId: string,
  prevValue: number,
  assets: Asset[]
) => {
  const transfersForYear = transfers.filter((it) => it.year === year && (it.from === assetId || it.to === assetId))

  const transferAmt =
    transfersForYear?.reduce((accum: number, transfer: Transfer) => {
      const { from, to } = transfer
      let adjustmentAmt = 0
      // What if costOfTransfer is > amt to transfer?
      if (from === assetId) {
        adjustmentAmt = -getTransferFromAmt(transfer, prevValue)
      } else if (to === assetId) {
        adjustmentAmt = getTransferToAmt(transfer, assets)
      }
      return Math.round(accum + adjustmentAmt)
    }, 0) ?? 0

  return transferAmt
}
