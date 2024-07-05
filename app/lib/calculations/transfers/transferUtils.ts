import { Transfer, IScenario } from "@/app/lib/data/schema/config"
import { Asset } from "../assets/Asset"

export const getScenarioTransfersForYear = (scenario: IScenario, year: number): Transfer[] => {
  const { transfers = [] } = scenario
  const transfersForYear = transfers.filter((it) => it.year === year)

  return transfersForYear
}

// There shouldn't be 2 full transfers from an asset, but definitely too an asset

export const getFullTransfers = (
  transfersForYear: Transfer[],
  assetId: string,
  assets: Asset[],
  prevValue: number,
  year: number
) => {
  const fullTransfersMatchingFrom = transfersForYear.filter((it) => it.from === assetId && it.migrateAll)
  if (fullTransfersMatchingFrom.length > 1) throw new Error("Cannot do 2 full transfers from 1 asset")

  const fullTransfersMatchingTo = transfersForYear.filter((it) => it.to === assetId && it.migrateAll)

  if (fullTransfersMatchingFrom.length > 0 && fullTransfersMatchingTo.length > 0) {
    throw new Error("Cannot have a full transfer into and out of the same asset")
  }

  if (fullTransfersMatchingFrom && fullTransfersMatchingFrom[0]) {
    if (fullTransfersMatchingFrom) return -prevValue
  }

  if (fullTransfersMatchingTo.length > 0) {
    const totalCostOfTransfers = fullTransfersMatchingTo.reduce((accum, it) => {
      const { costOfTransfer = 0 } = it
      return accum + costOfTransfer
    }, 0)

    const totalTransferAmt = fullTransfersMatchingTo.reduce((accum, it) => {
      const matchingAsset = assets.find((asset) => asset.id === it?.from)
      const matchingYearData = matchingAsset?.history.find((yearData) => yearData.year === year)

      if (matchingYearData) return accum + matchingYearData?.value

      return accum
    }, 0)

    return totalTransferAmt - totalCostOfTransfers
  }

  return 0
}

export const getPartialTransfers = (transfersForYear: Transfer[], assetId: string) => {
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
