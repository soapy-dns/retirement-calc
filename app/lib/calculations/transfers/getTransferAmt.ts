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

  const transfersForYear = transfers.filter((it) => it.year === year)

  const partialTransfersAmt = getPartialTransfers(transfersForYear, assetId)
  const fullTransfersAmt = getFullTransfers(transfersForYear, assetId, assets, prevValue, year)

  return partialTransfersAmt + fullTransfersAmt
}
