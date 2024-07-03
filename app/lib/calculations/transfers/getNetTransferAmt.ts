import { Transfer } from "../../data/schema/config"
import { Asset } from "../assets/Asset"
import { YearData } from "../types"
import { getFullTransfers, getPartialTransfers } from "./transferUtils"

// TODO: right some tests for

/*
TODO:
Write some tests for
1. partial and full transfer in /out
This should get the net transfer amount into this asset - a -ve value is a transfer out.
*/
export const getNetTransferAmt = (
  assetId: string,
  yearData: YearData,
  transfers: Transfer[] = [],
  assets: Asset[]
): number => {
  const { value: prevValue, year } = yearData

  const transfersForYear = transfers.filter((it) => it.year === year && (it.from === assetId || it.to === assetId))
  const partialTransferAmt = getPartialTransfers(transfersForYear, assetId)
  // console.log("--partialTransferAmt--", partialTransferAmt)
  const fullTransferAmt = getFullTransfers(transfersForYear, assetId, assets, prevValue, year)
  // console.log("--fullTransferAmt--", fullTransferAmt)

  if (fullTransferAmt) return fullTransferAmt
  else return partialTransferAmt

  // const totalTransferAmt = partialTransferAmt + fullTransferAmt

  // return totalTransferAmt
}
