import { IScenario } from "../../data/types"
import { Transfer } from "./types"

// export const getTransferAmt = (yearData: YearData, assetName: string, scenario: IScenario): number => {
//   const { value: prevValue, year } = yearData

//   // TODO: use value to calculate transferAll
//   const { transferData: scenarioTransfers } = scenario
//   if (!scenarioTransfers) return 0

//   const transfersForYear = scenarioTransfers[year] || []
//   const transferAmt =
//     transfersForYear?.reduce((accum: number, transfer: Transfer) => {
//       const { from, to, value: transferValue, costOfTransfer = 0, transferAll } = transfer
//       console.log("--transferAll--", transferAll)
//       if (from === assetName) {
//         // if (transferAll) {
//         //   // need to calculate the value in the middle of the year
//         // }
//         return rounded(accum - transferValue)
//       } else if (to === assetName) {
//         return rounded(accum + transferValue - costOfTransfer)
//       }
//       return rounded(accum)
//     }, 0) ?? 0

//   return rounded(transferAmt)
// }

// export const getTransfersForYear = (scenario: IScenario, year: number): Transfer[] => {
//   const { transferData } = scenario
//   const transfersForYear = transferData ? transferData[year] : []
//   return transfersForYear
// }

export const getScenarioTransfersForYear = (scenario: IScenario, year: number): Transfer[] => {
  const { transfers = [] } = scenario
  const transfersForYear = transfers.filter((it) => it.year === year)

  return transfersForYear
}

export const filterTransfersForYear = (transfers: Transfer[], year): Transfer[] => {
  return transfers.filter((it) => it.year === year)
}
