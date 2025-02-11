import { IScenario } from "../data/schema/config"
import { calculateTotalAssetIncomeAmt } from "./assetIncome/utils"
import { Asset } from "./assets/Asset"
import { addAssetIncome, getGroupedDrawdownableAssets } from "./assets/assetUtils"
import { AssetIncome, EarningsTax, Tax } from "./assets/types"
import { applyMandatedDrawdowns } from "./autoDrawdowns/applyMandatedDrawdowns"
import { applyAutoDrawdowns } from "./autoDrawdowns/drawdown"
import { getMandatedDrawdowns } from "./autoDrawdowns/getMandatedDrawdowns"
import { AutomatedDrawdown } from "./autoDrawdowns/types"
import { updateTaxesForAutoDrawdowns } from "./autoDrawdowns/updateTaxesForDrawdowns"
import { calculateEarningsTaxes } from "./tax/getEarningsTaxes"
import { BandedTaxCalc } from "./tax/taxCalcs/BandedTaxCalc"
import { calculateTaxes } from "./tax/utils"
import { getScenarioTransfersForYear } from "./transfers/transferUtils"
import { BasicYearData, DrawdownYearData, ExpenseYearData } from "./types"

interface Props {
  year: number
  scenario: IScenario
  totalDrawdowns: DrawdownYearData[]
  totalAssetIncome: BasicYearData[]
  totalExpenses: ExpenseYearData[]
  automatedDrawdownMap: Record<number, AutomatedDrawdown[]>
  projectedLivingExpenses: BasicYearData[]
  assets: Asset[]
  incomeTaxCalculator: BandedTaxCalc
  earningsTaxCalculator?: BandedTaxCalc
  taxes: Tax[]
  earningsTaxes: EarningsTax[]
  incomeFromAssets: AssetIncome[]
}

export const doCalculationsForYear = ({
  year,
  scenario,
  totalDrawdowns,
  totalAssetIncome,
  totalExpenses,
  automatedDrawdownMap,
  projectedLivingExpenses,
  assets,
  incomeTaxCalculator,
  earningsTaxCalculator,
  taxes,
  earningsTaxes,
  incomeFromAssets
}: Props): number => {
  const { context: contextConfig, transfers } = scenario
  const { owners } = contextConfig

  addAssetIncome(year, assets, incomeFromAssets)

  const manualTransfersForYear = getScenarioTransfersForYear(scenario, year)

  calculateTaxes(taxes, year, assets, owners, incomeTaxCalculator, incomeFromAssets, manualTransfersForYear)

  calculateEarningsTaxes(earningsTaxes, assets, year, earningsTaxCalculator)

  // TOTAL INCOME FOR THIS YEAR -will be moved to the 'incomeBucket' asset
  const totalIncomeFromAssetsAmt = calculateTotalAssetIncomeAmt(year, incomeFromAssets)
  totalAssetIncome.push({
    year,
    value: Math.round(totalIncomeFromAssetsAmt)
  })

  // MOVE INCOME FROM ASSETS *AND* PSS INCOME TO THE 'INCOME BUCKET' ASSET
  const assetToReceiveIncome = assets.find((it) => it.incomeBucket === true)
  if (!assetToReceiveIncome)
    throw new Error(
      "Income from assets has to go somewhere eg a bank account.  incomeBucket: true should be set on one asset"
    )

  const historyItem = assetToReceiveIncome.history.find((it) => it.year === year + 1) // get next year's asset calculation
  if (!historyItem) throw new Error(`No data found for income asset ${assetToReceiveIncome.name}`)
  historyItem.value = historyItem.value + totalIncomeFromAssetsAmt
  historyItem.incomeFromAssets = totalIncomeFromAssetsAmt

  const mandatedDrawdowns = getMandatedDrawdowns({ assets, year, owners, transfers })
  automatedDrawdownMap[year] = mandatedDrawdowns

  applyMandatedDrawdowns({ drawdowns: mandatedDrawdowns, assets })

  updateTaxesForAutoDrawdowns({
    owners,
    taxes,
    year,
    assets,
    automatedDrawdownsForYear: mandatedDrawdowns,
    incomeTaxCalculator
  })

  // RE-CALCULATE TAXES.  This is a bit of a hack because of Automatic drawdowns.
  // sutomatic drawdown pull money out of an asset for that year,
  //therefore the income wouldn't have been as much and so
  // the taxes wouldn't have been as much
  const groupedDrawdownableAssets = getGroupedDrawdownableAssets(year, assets)

  // why are we sending (for example) the entire taxes for all years when we are only interested in 1.
  const drawdownContext = {
    year,
    scenario,
    assets,
    automatedDrawdownMap,
    taxes,
    incomeTaxCalculator,
    owners,
    incomeFromAssets: incomeFromAssets,
    livingExpenses: projectedLivingExpenses,
    earningsTaxes,
    totalExpenses,
    totalDrawdowns,
    groupedAssets: groupedDrawdownableAssets
  }

  const remainingAmtToDrawdown = applyAutoDrawdowns(drawdownContext)

  return remainingAmtToDrawdown
}
