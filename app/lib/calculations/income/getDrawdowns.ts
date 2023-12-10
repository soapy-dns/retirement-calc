import { Constants } from "../constants"

// TODO: this should be hae the same shape as a transfer?
interface Drawdown {
  from: string // TODO: from and to should be enums?
  to: string
  value: number
}

export const getDrawdownAmt = (transfersForYear: Drawdown[] = []): number => {
  return transfersForYear.reduce((accum, it) => {
    if (it.to === Constants.DRAWDOWN) return accum + it.value || 0

    return accum
  }, 0)
}
