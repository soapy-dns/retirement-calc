import { Asset } from "../assets/Asset"
import { DrawdownYearData, Earning, ExpenseYearData, Tax } from "../assets/types"
import { IScenario } from "../../data/types"
import { getDrawdownAmt } from "../income/getDrawdowns"
import { getTaxAmtForYear } from "../tax/getTaxAmt"
import { IncomeTaxCalc } from "../tax/taxCalcs/incomeTaxCalc"
import { getTaxableDrawdownAmt } from "../tax/utils"
import { getLivingExpensesAmtForYear } from "../utils/livingExpensesUtils"
import { createAutoDrawdowns } from "./createAutoDrawdowns"
import { AutomatedDrawdown } from "./types"
import { BasicYearData } from "../types"

interface IContext {
  year: number
  scenario: IScenario
  assets: Asset[]
  automatedDrawdownMap: Record<number, AutomatedDrawdown[]>
  taxes: Tax[]
  incomeTaxCalculator: IncomeTaxCalc
  owners: string[]
  earningsFromAssets: Earning[]
  livingExpenses: BasicYearData[]
  totalExpenses: ExpenseYearData[]
  totalDrawdowns: DrawdownYearData[]
  groupedAssets: Asset[][]
}

const drawdownIteration = (
  { scenario, year, automatedDrawdownMap, taxes, incomeTaxCalculator, owners, groupedAssets }: IContext,
  remainingAmtToDrawdown: number
) => {
  const existingAutoDrawdowns = automatedDrawdownMap[year] || []

  // new automated drawdowns -> add them to existing
  const newAutoDrawdownsForYear = createAutoDrawdowns(year, groupedAssets, remainingAmtToDrawdown)
  const automatedDrawdownsForYear = existingAutoDrawdowns.concat(newAutoDrawdownsForYear)

  // console.log("--year, newAutoDrawdownsForYear--", year, newAutoDrawdownsForYear)

  automatedDrawdownMap[year] = automatedDrawdownsForYear

  owners.forEach((owner) => {
    const taxForOwner = taxes.find((it) => it.owner === owner)
    if (!taxForOwner) throw new Error("No tax for owner")
    const taxHistory = taxForOwner.history.find((it) => it.year === year)
    if (!taxHistory) throw new Error("No tax history")

    const taxableAutomatedDrawdownAmt = getTaxableDrawdownAmt(scenario, automatedDrawdownsForYear, owner)

    // This isn't right.  We are doubling. TODO:
    const newTotalTaxableAmt =
      taxHistory.taxableEarningsAmt + taxHistory.taxableDrawdownsAmt + taxableAutomatedDrawdownAmt

    const ownersTaxAmt = incomeTaxCalculator.getTax(newTotalTaxableAmt)

    // UPDATE TAX DETAILS
    taxHistory.totalTaxableAmt = Math.round(newTotalTaxableAmt)
    taxHistory.taxableAutomatedDrawdownAmt = Math.round(ownersTaxAmt) - taxHistory.value // temp
    taxHistory.value = Math.round(ownersTaxAmt)
  })
}

/**
 * A drawdown is value taken from an asset.
 * Calculate and apply the drawdowns required to math the desired spend / expenses
 * As drawdowns an be taxed, we need to iterate
 * @param context
 */
export const applyAutoDrawdowns = (context: IContext): number => {
  const { year, automatedDrawdownMap, taxes, livingExpenses, totalExpenses, totalDrawdowns } = context

  const livingExpenseForYearAmt = getLivingExpensesAmtForYear(year, livingExpenses)

  let totalTaxesAmt = 0
  let totalExpensesAmt = 0
  let automatedDrawdownsAmt = 0

  // TOTAL EXPENSES FOR THIS YEAR - taxes plus living expenses
  totalTaxesAmt = getTaxAmtForYear(taxes, year) //all owners
  totalExpensesAmt = totalTaxesAmt + livingExpenseForYearAmt

  let remainingAmtToDrawdown = totalExpensesAmt

  let i = 0
  while (remainingAmtToDrawdown > 100 && i < 100) {
    i = i + 1

    drawdownIteration(context, remainingAmtToDrawdown)

    totalTaxesAmt = getTaxAmtForYear(taxes, year) //all owners
    totalExpensesAmt = totalTaxesAmt + livingExpenseForYearAmt

    automatedDrawdownsAmt = getDrawdownAmt(automatedDrawdownMap[year])

    remainingAmtToDrawdown = Math.round(totalExpensesAmt - automatedDrawdownsAmt)
  }

  totalExpenses.push({
    year,
    value: totalExpensesAmt,
    livingExpenses: livingExpenseForYearAmt,
    taxes: totalTaxesAmt
  })

  totalDrawdowns.push({
    year,
    value: Math.round(automatedDrawdownsAmt),
    autoDrawdownAmt: automatedDrawdownsAmt,
    automatedDrawdowns: automatedDrawdownMap[year]
  })

  return remainingAmtToDrawdown
}
