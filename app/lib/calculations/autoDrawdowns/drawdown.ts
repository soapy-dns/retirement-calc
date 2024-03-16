import { Asset } from "../assets/Asset"
import { DrawdownYearData, Earning, ExpenseYearData, Tax } from "../assets/types"
import { IScenario } from "../../data/schema/config"
import { getDrawdownAmt } from "../income/getDrawdowns"
import { getTaxAmtForYear } from "../tax/getTaxAmt"
import { IncomeTaxCalc } from "../tax/taxCalcs/incomeTaxCalc"
import { getTaxableDrawdownAmt } from "../tax/utils"
import { getLivingExpensesAmtForYear } from "../utils/livingExpensesUtils"
import { createAutoDrawdowns } from "./createAutoDrawdowns"
import { AutomatedDrawdown } from "./types"
import { BasicYearData } from "../types"
import { mergeAutoDrawdowns } from "./mergeAutoDrawdowns"

interface IDrawdownContext {
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
  { scenario, year, automatedDrawdownMap, taxes, incomeTaxCalculator, owners, groupedAssets }: IDrawdownContext,
  remainingAmtToDrawdown: number
) => {
  const existingAutoDrawdowns = automatedDrawdownMap[year] || []

  const newAutoDrawdownsForYear = createAutoDrawdowns(year, groupedAssets, remainingAmtToDrawdown)

  const automatedDrawdownsForYear = mergeAutoDrawdowns(existingAutoDrawdowns, newAutoDrawdownsForYear)

  automatedDrawdownMap[year] = automatedDrawdownsForYear

  owners.forEach((owner) => {
    const taxForOwner = taxes.find((it) => it.owner === owner)
    if (!taxForOwner) throw new Error("No tax for owner")
    const taxHistory = taxForOwner.history.find((it) => it.year === year)
    if (!taxHistory) throw new Error("No tax history")

    const taxableAutomatedDrawdownAmt = getTaxableDrawdownAmt(
      scenario,
      automatedDrawdownsForYear,
      owner,
      groupedAssets.flat()
    )

    // This isn't right.  We are doubling. TODO:
    const newTotalTaxableAmt =
      taxHistory.taxableEarningsAmt + taxHistory.taxableDrawdownsAmt + taxableAutomatedDrawdownAmt
    // console.log(
    //   "--newTotalTaxableAmt, taxHistory.taxableEarningsAmt , taxHistory.taxableDrawdownsAmt , taxableAutomatedDrawdownAmt--",
    //   newTotalTaxableAmt,
    //   taxHistory.taxableEarningsAmt,
    //   taxHistory.taxableDrawdownsAmt,
    //   taxableAutomatedDrawdownAmt
    // )

    const ownersTaxAmt = incomeTaxCalculator.getTax(newTotalTaxableAmt, year)

    // UPDATE TAX DETAILS
    taxHistory.totalTaxableAmt = Math.round(newTotalTaxableAmt)
    taxHistory.taxableAutomatedDrawdownAmt = Math.round(taxableAutomatedDrawdownAmt)
    taxHistory.value = Math.round(ownersTaxAmt)
  })
}

/**
 * A drawdown is value taken from an asset.
 * Calculate and apply the drawdowns required to math the desired spend / expenses
 * As drawdowns an be taxed, we need to iterate
 */
export const applyAutoDrawdowns = (drawdownContext: IDrawdownContext): number => {
  const { year, automatedDrawdownMap, taxes, livingExpenses, totalExpenses, totalDrawdowns } = drawdownContext

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

    drawdownIteration(drawdownContext, remainingAmtToDrawdown)

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
