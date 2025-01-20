import { Transfer } from "../../data/schema/config"

export const getTransferFromAmt = (transfer: Transfer, prevValue: number): number => {
  const { transferPercent } = transfer

  return (prevValue * transferPercent) / 100
}
