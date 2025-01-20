import { Transfer } from "@/app/lib/data/schema/config"
import { TransferFormData } from "../getTransferFormSchema"

/*
 A -> B and B -> C BAD - tested by testForMultipleMigrateAllFromAndTo
 A -> B and A -> C BAD - Tested by testForMultipleMigrateAllFrom
 A -> B and B -> C GOOD
*/

// TODO: remove after transfers refactored
// export const testForMultipleMigrateAllFrom = (
//   { from, year, transferCostType, transferPercent, transferCostValue }: FormDataType,
//   transfers: Transfer[] = []
// ): boolean => {
//   console.log("--testForMultipleMigrateAllFrom-->>>>>>>>>>>>>>>>>")
//   if (migrateAll === "Y") {
//     const isAnotherMigrateAllFrom = transfers?.find((existingTransfer) => {
//       return existingTransfer.year === year && existingTransfer.from === from && existingTransfer.migrateAll
//     })
//     if (isAnotherMigrateAllFrom) return false
//   }

//   return true
// }

// verify that for any one year not more that 100% is being transferred
// export const verifyNotTransferingMoreThan100Percent = (
//   { from, year, transferCostType, transferPercent, transferCostValue }: FormDataType,
//   transfers: Transfer[] = []
// ): boolean => {
//   const thisYearsTransfers = transfers.filter((transfer) => transfer.year === year)
//   const totalTransferPercent = thisYearsTransfers.reduce((accum, transfer) => {
//     return transfer.from === from ? accum + transfer.transferPercent : accum
//   }, 0)

//   return totalTransferPercent > 100
// }

// TODO: remove after transfers refactored
// export const testForMultipleMigrateAllFromAndTo = (
//   { to, year, migrateAll }: FormDataType,
//   transfers: Transfer[] = []
// ): boolean => {
//   if (migrateAll === "Y") {
//     const isAnotherMigrateAllFrom = transfers?.find((existingTransfer) => {
//       return existingTransfer.year === year && existingTransfer.from === to && existingTransfer.migrateAll
//     })
//     if (isAnotherMigrateAllFrom) return false
//   }

//   return true
// }
