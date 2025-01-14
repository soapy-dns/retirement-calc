"use server"

import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"
import { IScenario, Transfer, InflationRecord, StressTest, StressTestEnum } from "@/app/lib/data/schema/config"
import { getRandomKey } from "@/app/lib/utils/getRandomKey"
import cloneDeep from "lodash/cloneDeep"
import { getUpdatedLivingExpensesConfig } from "./getUpdatedLivingExpensesConfig"

console.log("enum-------------------", StressTestEnum.enum)

export const getNewScenario = async (
  scenario: IScenario,
  name: string,
  description: string,
  stressTest: StressTest
): Promise<IScenario> => {
  const thisYear = getCurrentYear()
  const isYearUpdated = scenario.asAtYear < thisYear
  const newScenario = {
    ...cloneDeep(scenario),
    name,
    description,
    id: getRandomKey(),
    stressTest: stressTest,
    asAtYear: thisYear
  }

  if (!isYearUpdated) throw new Error("Year is not updated")

  // remove historical transfers
  const newTransfers = !newScenario.transfers
    ? []
    : newScenario.transfers.reduce((accum, transfer) => {
        if (transfer.year < thisYear) return accum
        accum.push(transfer)
        return accum
      }, [] as Transfer[])
  newScenario.transfers = newTransfers

  // inflation
  const { inflation } = scenario.context
  const newInflationConfig = inflation.reduce((accum, row) => {
    if (row.fromYear < thisYear) return accum
    accum.push({ ...row })
    return accum
  }, [] as InflationRecord[])

  if (newInflationConfig.length === 0 || (newInflationConfig[0] && newInflationConfig[0].fromYear !== thisYear)) {
    // need to add a new first row
    const indexOfRowToAdd = inflation.findLastIndex((it) => it.fromYear < thisYear)
    const newFirstRow = { fromYear: thisYear, inflationRate: inflation[indexOfRowToAdd].inflationRate }
    newInflationConfig.unshift(newFirstRow)
  }
  newScenario.context.inflation = newInflationConfig

  const newLivingExpenses = getUpdatedLivingExpensesConfig(scenario, thisYear)

  newScenario.context.livingExpenses = newLivingExpenses

  // update capital value for all capital assets, as some assets may no longer exist
  // update income in line with inflation.

  return newScenario
}
