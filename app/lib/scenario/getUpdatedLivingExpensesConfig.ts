import { IScenario, LivingExpensesRecord } from "@/app/lib/data/schema/config"

import { getInflationFactorAtNewYear } from "./getInflationFactorAtNewYear"

// this is using yesterday's money - this should probably be done at the backend?  One call with calculation.
export const getUpdatedLivingExpensesConfig = (scenario: IScenario, newYear: number): LivingExpensesRecord[] => {
  const { asAtYear, context } = scenario
  const { inflation: inflationConfig, livingExpenses: livingExpensesConfig } = context

  if (livingExpensesConfig[0].fromYear >= newYear) throw new Error("invalid new year for calculating living expenses")

  const inflationFactorAsAtNewYear = getInflationFactorAtNewYear(asAtYear, newYear, inflationConfig)

  const indexOfYearBiggerThanNewYear = livingExpensesConfig.findIndex((it) => it.fromYear > newYear)

  console.log("indexOfYearBiggerThanNewYear", indexOfYearBiggerThanNewYear)
  console.log("livingExpensesConfig", livingExpensesConfig)
  // new year is bigger than the last year in the config
  if (indexOfYearBiggerThanNewYear === -1) {
    const amountAsAtNewYear =
      livingExpensesConfig[livingExpensesConfig.length - 1].amountInTodaysTerms * inflationFactorAsAtNewYear

    return [{ fromYear: newYear, amountInTodaysTerms: amountAsAtNewYear }]
  }

  const newLivingExpensesConfig: LivingExpensesRecord[] = [
    {
      fromYear: newYear,
      amountInTodaysTerms: livingExpensesConfig[indexOfYearBiggerThanNewYear - 1].amountInTodaysTerms
    }
  ].concat(livingExpensesConfig.slice(indexOfYearBiggerThanNewYear))

  const newLivingExpensesConfigWithInflation = newLivingExpensesConfig.map((it) => {
    return {
      fromYear: it.fromYear,
      amountInTodaysTerms: it.amountInTodaysTerms * inflationFactorAsAtNewYear
    }
  })

  return newLivingExpensesConfigWithInflation
}
