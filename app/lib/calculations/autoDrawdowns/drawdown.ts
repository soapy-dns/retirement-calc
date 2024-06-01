import { Asset } from "../assets/Asset"
import { DrawdownYearData, AssetIncome, ExpenseYearData, Tax, EarningsTax } from "../assets/types"
import { IScenario } from "../../data/schema/config"
import { getDrawdownAmt } from "../income/getDrawdowns"
import { getTaxAmtForYear } from "../tax/getTaxAmt"
import { BandedTaxCalc } from "../tax/taxCalcs/BandedTaxCalc"
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
  incomeTaxCalculator: BandedTaxCalc
  owners: string[]
  incomeFromAssets: AssetIncome[]
  livingExpenses: BasicYearData[]
  earningsTaxes: EarningsTax[]
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
      // scenario,
      automatedDrawdownsForYear,
      owner,
      groupedAssets.flat()
    )

    // This isn't right.  We are doubling. TODO:
    const newTotalTaxableAmt =
      taxHistory.taxableIncomeAmt + taxHistory.taxableDrawdownsAmt + taxableAutomatedDrawdownAmt

    const ownersTaxAmt = incomeTaxCalculator.getTax(newTotalTaxableAmt, year)

    // UPDATE TAX DETAILS
    taxHistory.totalTaxableAmt = Math.round(newTotalTaxableAmt)
    taxHistory.taxableAutomatedDrawdownAmt = Math.round(taxableAutomatedDrawdownAmt)
    taxHistory.value = Math.round(ownersTaxAmt)
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
  let automatedDrawdownsAmt = 0

  // TOTAL EXPENSES FOR THIS YEAR - taxes plus living expenses
  totalIncomeTaxesAmt = getTaxAmtForYear(taxes, year) //all owners
  const totalEarningsTaxesAmt = getTaxAmtForYear(earningsTaxes, year)
  totalExpensesAmt = livingExpenseForYearAmt + totalIncomeTaxesAmt + totalEarningsTaxesAmt

  let remainingAmtToDrawdown = totalExpensesAmt

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

  totalDrawdowns.push({
    year,
    value: Math.round(automatedDrawdownsAmt),
    autoDrawdownAmt: automatedDrawdownsAmt,
    automatedDrawdowns: automatedDrawdownMap[year]
  })

  return remainingAmtToDrawdown
}
