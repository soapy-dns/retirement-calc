import { calculate } from "@/app/lib/calculations"
import { CalculationResults } from "@/app/lib/calculations/types"
import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"
import { IScenario, Transfer, InflationRecord, LivingExpensesRecord } from "@/app/lib/data/schema/config"
import { getRandomKey } from "@/app/lib/utils/getRandomKey"
import cloneDeep from "lodash/cloneDeep"
import { getUpdatedLivingExpenses } from "./getUpdatedLivingExpenses"

export const getNewScenario = async (scenario: IScenario, name: string, description: string): Promise<IScenario> => {
  const thisYear = getCurrentYear()
  const isYearUpdated = scenario.asAtYear < thisYear
  const newScenario = {
    ...cloneDeep(scenario),
    name,
    description,
    id: getRandomKey(),
    asAtYear: thisYear
  }

  if (isYearUpdated) {
    const calculationResults: CalculationResults = await calculate(scenario)
    console.log("--calculationResults>>>--", calculationResults)

    const { success } = calculationResults
    if (!success) throw new Error("Error with calculation while building new scenario.")

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

    // living expenses - the first record should always be this asAtYear
    const { livingExpenses } = scenario.context

    const expensesData = calculationResults.expensesRowData["Living expenses (today's money)"] // This should use a better key TODO:

    const newLivingExpenses = getUpdatedLivingExpenses(livingExpenses, thisYear, expensesData)

    newScenario.context.livingExpenses = newLivingExpenses

    // update capital value for all capital assets, as some assets may no longer exist
    // update income in line with inflation.
  }

  return newScenario
}
