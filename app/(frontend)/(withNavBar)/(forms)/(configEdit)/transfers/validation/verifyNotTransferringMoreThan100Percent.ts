import { Transfer } from "@/app/lib/data/schema/config"
import { TransferFormData } from "../getTransferFormSchema"

// verify that for any one year not more that 100% is being transferred
export const verifyNotTransferringMoreThan100Percent = (
  { from, year, transferPercent }: TransferFormData,
  transfers: Transfer[] = []
): boolean => {
  const thisYearsTransfers = transfers.filter((transfer) => transfer.year === year && transfer.from === from)
  const existingTotalTransferPercent = thisYearsTransfers.reduce((accum, transfer) => {
    return accum + transfer.transferPercent
  }, 0)

  return transferPercent + existingTotalTransferPercent <= 100
}
