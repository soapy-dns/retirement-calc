import { Transfer } from "../../data/schema/config"
import { Asset } from "../assets/Asset"
import { YearData } from "../types"
import { getFullTransfers, getPartialTransfers } from "./transferUtils"

export const getTransferAmt = (
  assetId: string,
  yearData: YearData,
  transfers: Transfer[] = [],
  assets: Asset[]
): number => {
  const { value: prevValue, year } = yearData

  const transfersForYear = transfers.filter((it) => it.year === year && (it.from === assetId || it.to === assetId))
  const partialTransferAmt = getPartialTransfers(transfersForYear, assetId)
  const fullTransferAmt = getFullTransfers(transfersForYear, assetId, assets, prevValue, year)

  const totalTransferAmt = partialTransferAmt + fullTransferAmt

  return totalTransferAmt
}
