import { Transfer } from "../../data/schema/config"
import { Asset } from "../assets/Asset"
import { YearData } from "../types"

export const getTransferAmt = (
  assetId: string,
  yearData: YearData,
  transfers: Transfer[] = [],
  assets: Asset[]
): number => {
  const { value: prevValue, year } = yearData

  const transfersForYear = transfers.filter((it) => it.year === year)

  const getFullTransfers = () => {
    const fullTransferFrom = transfersForYear.find((it) => it.from === assetId && it.migrateAll)
    const fullTransferTo = transfersForYear.find((it) => it.to === assetId && it.migrateAll)

    if (fullTransferFrom || fullTransferTo) {
      const costOfTransfer = fullTransferTo?.costOfTransfer || 0
      // no need to calc the amt in the middle of the year - subsequent calculations will do this
      if (fullTransferTo) {
        // need to find the Value of the 'from' asset for this year
        const matchingAsset = assets.find((it) => it.id === fullTransferTo?.from)
        const matchingYearData = matchingAsset?.history.find((it) => it.year === year)
        return matchingYearData ? matchingYearData.value - costOfTransfer : 0
      }
      if (fullTransferFrom) return -prevValue
    }

    return 0
  }

  const getPartialTransfers = () => {
    const partialTransferAmt =
      transfersForYear?.reduce((accum: number, transfer: Transfer) => {
        const { from, to, value: transferValue, costOfTransfer = 0, migrateAll } = transfer
        if (!transferValue || migrateAll) return accum
        if (from === assetId) {
          return Math.round(accum - transferValue)
        } else if (to === assetId) {
          return Math.round(accum + transferValue - costOfTransfer)
        }
        return Math.round(accum)
      }, 0) ?? 0

    return partialTransferAmt
  }

  const partialTransfersAmt = getPartialTransfers()
  const fullTransfersAmt = getFullTransfers()

  return partialTransfersAmt + fullTransfersAmt
}
