import { IScenario } from "../data/schema/config"
import { buildInitialAssets } from "./assets/assetUtils"
import { AssetIncome } from "./assets/types"
import { AutomatedDrawdown } from "./autoDrawdowns/types"
import { getEarningsTaxCalculator, getIncomeTaxCalculator } from "./tax/taxCalcs/getTaxCalculator"
import { initEarningsTaxes, initTaxes } from "./tax/utils"
import { BasicYearData, DrawdownYearData, ExpenseYearData } from "./types"
import { getInflationContext } from "./utils/getInflationContext"
import { initialiseIncomeFromAssets } from "./utils/initialiseIncomeFromAssets"
import { getLivingExpenses } from "./utils/livingExpensesUtils"

export const initialiseCalculation = (scenario: IScenario, yearRange: number[]) => {
  const { asAtYear } = scenario

  const totalDrawdowns: DrawdownYearData[] = []
  const totalAssetIncome: BasicYearData[] = []
  const totalExpenses: ExpenseYearData[] = []
  const automatedDrawdownMap: Record<number, AutomatedDrawdown[]> = {}

  const startingYear = asAtYear

  const { context: contextConfig } = scenario

  const {
    numOfYears,
    taxResident = "AU",
    inflation: inflationConfig,
    owners,
    livingExpenses = [],
    currency,
    au2ukExchangeRate
  } = contextConfig

  // SET UP CONTEXT
  const inflationContext = getInflationContext(yearRange, inflationConfig)
  const { livingExpensesTodaysMoney, projectedLivingExpenses } = getLivingExpenses(
    yearRange,
    livingExpenses,
    inflationContext
  )

  // SET UP ASSETS
  const assets = buildInitialAssets(startingYear, scenario, inflationContext)

  // Can only deal with 100% UK or 100% AU residency
  const incomeTaxCalculator = getIncomeTaxCalculator({
    taxResident,
    currency,
    inflationContext,
    au2ukExchangeRate,
    asAtYear
  })
  const earningsTaxCalculator = getEarningsTaxCalculator({
    taxResident,
    currency,
    inflationContext,
    au2ukExchangeRate,
    asAtYear
  })

  const taxes = initTaxes(yearRange, owners)
  const earningsTaxes = initEarningsTaxes(yearRange, owners)

  const incomeFromAssets: AssetIncome[] = initialiseIncomeFromAssets(assets)

  return {
    totalDrawdowns,
    totalAssetIncome,
    totalExpenses,
    automatedDrawdownMap,
    yearRange,
    inflationContext,
    livingExpensesTodaysMoney,
    projectedLivingExpenses,
    assets,
    incomeTaxCalculator,
    earningsTaxCalculator,
    taxes,
    earningsTaxes,
    incomeFromAssets
  }
}
