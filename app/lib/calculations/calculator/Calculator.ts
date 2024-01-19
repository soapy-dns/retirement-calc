import { Asset } from "../assets/Asset"
import { AssetConfig, YearData } from "../assets/types"
import { Transfer } from "@/app/lib/data/schema/config"

// export interface incomeCalculator {
//   config: unknown
// }

export abstract class Calculator {
  protected abstract config: object
  protected transfers: Transfer[] | undefined
  protected assetConfig: AssetConfig

  constructor(assetConfig: AssetConfig, transfers?: Transfer[]) {
    this.transfers = transfers

    this.assetConfig = assetConfig
  }

  // Amt to transfer (based at the beginning of the year as per partial transfers)
  protected getFullTransfers = (yearData: YearData, transfersForYear: Transfer[], assets: Asset[]) => {
    if (!transfersForYear) return 0 // TODO: why do we need this?

    const { value: prevValue, year } = yearData
    const { id: assetId } = this.assetConfig

    const fullTransferFrom = transfersForYear.find((it) => it.from === assetId && it.migrateAll)
    const fullTransferTo = transfersForYear.find((it) => it.to === assetId && it.migrateAll)

    if (fullTransferFrom || fullTransferTo) {
      // TODO: validate don't have a full transfer from and a full transfer too.  probably need a validation section
      // const partialtransfer = transfersForYear.find((it) => (it.from === assetId || it.to === assetId) && it.value)
      // if (partialtransfer) throw new Error(`Cannot have full and partial transfers ${assetId}`)

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

  getPartialTransfers = (transfers: Transfer[]) => {
    const { id: assetId } = this.assetConfig

    const partialTransferAmt =
      transfers?.reduce((accum: number, transfer: Transfer) => {
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

  abstract calculate(yearData: YearData, assets: Asset[]): YearData
}
