import { Asset } from "../assets/Asset"
import { DrawdownYearData, AssetIncome, ExpenseYearData, Tax, EarningsTax } from "../assets/types"
import { IScenario, OwnersType } from "../../data/schema/config"
import { getDrawdownAmt } from "../income/getDrawdowns"
import { getTaxAmtForYear } from "../tax/getTaxAmt"
import { BandedTaxCalc } from "../tax/taxCalcs/BandedTaxCalc"
import { getLivingExpensesAmtForYear } from "../utils/livingExpensesUtils"
import { createAutoDrawdowns } from "./createAutoDrawdowns"
import { AutomatedDrawdown } from "./types"
import { BasicYearData } from "../types"
import { mergeAutoDrawdowns } from "./mergeAutoDrawdowns"
import { updateTaxesForAutoDrawdowns } from "./updateTaxesForDrawdowns"

interface IDrawdownContext {
  year: number
  scenario: IScenario
  assets: Asset[]
  automatedDrawdownMap: Record<number, AutomatedDrawdown[]>
  taxes: Tax[]
  incomeTaxCalculator: BandedTaxCalc
  owners: OwnersType
  incomeFromAssets: AssetIncome[]
  livingExpenses: BasicYearData[]
  earningsTaxes: EarningsTax[]
  totalExpenses: ExpenseYearData[]
  totalDrawdowns: DrawdownYearData[]
  groupedAssets: Asset[][]
}

const drawdownIteration = (
  { scenario, year, automatedDrawdownMap, taxes, incomeTaxCalculator, owners, groupedAssets, assets }: IDrawdownContext,
  remainingAmtToDrawdown: number
) => {
  const existingAutoDrawdowns = automatedDrawdownMap[year] || []

  const newAutoDrawdownsForYear = createAutoDrawdowns(year, groupedAssets, remainingAmtToDrawdown)

  const automatedDrawdownsForYear = mergeAutoDrawdowns(existingAutoDrawdowns, newAutoDrawdownsForYear)

  // update map
  automatedDrawdownMap[year] = automatedDrawdownsForYear

  updateTaxesForAutoDrawdowns({
    owners,
    taxes,
    year,
    assets,
    automatedDrawdownsForYear,
    incomeTaxCalculator
  })
}

/**
 * TODO: the inputs are huge, making this practically impossible to test
 * A drawdown is value taken from an asset.
 * Calculate and apply the drawdowns required to math the desired spend / expenses
 * As drawdowns an be taxed, we need to iterate
 */
export const applyAutoDrawdowns = (drawdownContext: IDrawdownContext): number => {
  const { year, automatedDrawdownMap, taxes, livingExpenses, totalExpenses, earningsTaxes, totalDrawdowns } =
    drawdownContext

  const livingExpenseForYearAmt = getLivingExpensesAmtForYear(year, livingExpenses)

  let totalIncomeTaxesAmt = 0
  let totalExpensesAmt = 0
  let automatedDrawdownsAmt = getDrawdownAmt(automatedDrawdownMap[year])

  // TOTAL EXPENSES FOR THIS YEAR - taxes plus living expenses
  totalIncomeTaxesAmt = getTaxAmtForYear(taxes, year) //all owners
  const totalEarningsTaxesAmt = getTaxAmtForYear(earningsTaxes, year)
  totalExpensesAmt = livingExpenseForYearAmt + totalIncomeTaxesAmt + totalEarningsTaxesAmt
  // if (year === 2024) {
  //   console.log("--totalIncomeTaxesAmt #1  --", totalIncomeTaxesAmt)
  // }

  let remainingAmtToDrawdown = Math.round(totalExpensesAmt - automatedDrawdownsAmt)

  let i = 0
  while (remainingAmtToDrawdown > 100 && i < 100) {
    i = i + 1

    drawdownIteration(drawdownContext, remainingAmtToDrawdown)

    totalIncomeTaxesAmt = getTaxAmtForYear(taxes, year) //all owners
    totalExpensesAmt = totalIncomeTaxesAmt + livingExpenseForYearAmt

    automatedDrawdownsAmt = getDrawdownAmt(automatedDrawdownMap[year])

    remainingAmtToDrawdown = Math.round(totalExpensesAmt - automatedDrawdownsAmt)
  }

  totalExpenses.push({
    year,
    value: totalExpensesAmt,
    livingExpenses: livingExpenseForYearAmt,
    taxes: totalIncomeTaxesAmt
  })

  // drawdowns are transfers which seem to be like yearData
  totalDrawdowns.push({
    year,
    value: Math.round(automatedDrawdownsAmt),
    autoDrawdownAmt: automatedDrawdownsAmt,
    automatedDrawdowns: automatedDrawdownMap[year]
  })

  return remainingAmtToDrawdown
}
