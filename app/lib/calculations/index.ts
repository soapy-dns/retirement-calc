import range from "lodash/range.js"
import { addAssetEarnings, canDrawdownAssets, getGroupedAssets, buildInitialAssets } from "./assets/assetUtils"
import { calculateTaxes, initTaxes } from "./tax/utils"
import { DrawdownYearData, Earning, ExpenseYearData, Tax } from "./assets/types"
import { getLivingExpenses } from "./utils/livingExpensesUtils"
import { initialiseEarningsFromAssets } from "./utils/initialiseEarningsFromAssets"
import { AutomatedDrawdown } from "./autoDrawdowns/types"
import { applyAutoDrawdowns } from "./autoDrawdowns/drawdown"
import { CellData } from "../view/pages/sheets/row/types"
import { AssetData, RowData, IScenario, SurplusYearData } from "../data/types"
import { getInflationContext } from "./utils/getInflationContext"
import { calculateTotalEarnings } from "./earnings/utils"
import { removeUnusedHistoryFromTaxes } from "./tax/removeUnusedHistoryFromTaxes"
import { getYearRange } from "./utils/yearRange"
import { getIncomeTaxCalculator } from "./tax/taxCalcs/getIncomeTaxCalculator"
import { BasicYearData, CalculationData } from "./types"
import { getAssetSplit } from "./assets/getAssetClasses"
import { getCalculatedNpvData, getGraphIncomeNpvData } from "./utils/getCalculatedNpvData"
import { getStartingYear } from "./utils/getStartingYear"

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const calculateAsync = async (scenario: IScenario) => {
  console.log("calculate ASYNC")
  await sleep(1000)

  return calculate(scenario)
}

export const calculate = (scenario: IScenario) => {
  try {
    console.log("calculate for scenario", scenario)
    // setup
    let calculationMessage = ""
    const totalDrawdowns: DrawdownYearData[] = []
    const totalEarnings: BasicYearData[] = []
    const totalExpenses: ExpenseYearData[] = []
    const automatedDrawdownMap: Record<number, AutomatedDrawdown[]> = {}

    const startingYear = getStartingYear()

    const { context } = scenario

    const {
      numOfYears = 50,
      taxResident = "AU",
      inflation: inflationConfig,
      owners,
      livingExpenses = [],
      currency,
      au2ukExchangeRate
    } = context

    console.groupCollapsed("---calculations---")
    const { yearRange, to } = getYearRange(startingYear, numOfYears)

    const inflationContext = getInflationContext(yearRange, inflationConfig)

    const { livingExpensesTodaysMoney, projectedLivingExpenses } = getLivingExpenses(
      yearRange,
      livingExpenses,
      inflationContext
    )

    // SET UP ASSETS
    const assets = buildInitialAssets(startingYear, scenario, inflationContext)

    // if we are 90% in AU and 10% in UK, does that mean we have 2 different tax calculators?
    const incomeTaxCalculator = getIncomeTaxCalculator({ taxResident, currency, au2ukExchangeRate })

    const taxes = initTaxes(yearRange, owners)
    const earningsFromAssets: Earning[] = initialiseEarningsFromAssets(assets, owners)
    if (!scenario) throw new Error("No scenario found")
    // end of setup

    //
    let year = startingYear
    let calculatedEndYear = startingYear
    while (year < to && canDrawdownAssets(assets, year)) {
      calculatedEndYear = year + 1
      addAssetEarnings(year, assets, earningsFromAssets)

      calculateTaxes(scenario, year, owners, incomeTaxCalculator, earningsFromAssets, taxes)
      // console.log("--year, taxes--", year, taxes)

      // TOTAL INCOME FOR THIS YEAR -will be moved to the 'incomeBucket' asset
      const totalEarningsFromAssetsAmt = calculateTotalEarnings(year, earningsFromAssets, totalEarnings)

      // MOVE 'EARNINGS' FROM ASSETS *AND* PSS INCOME TO THE 'INCOME BUCKET' ASSET
      const assetToReceiveIncome = assets.find((it) => it.incomeBucket === true)
      if (!assetToReceiveIncome)
        throw new Error(
          "Income from assets has to go somewhere eg a bank account.  incomeBucket: true should be set on one asset"
        )

      const historyItem = assetToReceiveIncome.history.find((it) => it.year === year + 1) // get next year's asset calculation
      if (!historyItem) throw new Error(`No data found for income asset ${assetToReceiveIncome.name}`)
      historyItem.value = historyItem.value + totalEarningsFromAssetsAmt
      historyItem.incomeFromAssets = totalEarningsFromAssetsAmt

      // RE-CALCULATE TAXES.  This is a bit of a hack because of Automatic drawdowns.
      // sutomatic drawdown pull money out of an asset for that year,
      //therefore the earnings wouldn't have been as much and so
      // the taxes wouldn't have been as much
      const groupedAssets = getGroupedAssets(year, assets)
      // console.log("--groupedAssets--", groupedAssets)

      const context = {
        year,
        scenario,
        assets,
        automatedDrawdownMap,
        taxes,
        incomeTaxCalculator,
        owners,
        earningsFromAssets,
        livingExpenses: projectedLivingExpenses,
        totalExpenses,
        totalDrawdowns,
        groupedAssets
      }

      const remainingAmtToDrawdown = applyAutoDrawdowns(context)
      if (remainingAmtToDrawdown > 100) {
        console.log(
          `REMAINING AMOUNT TO DRAWDOWN = ${remainingAmtToDrawdown} for year ${year} - stopping further calculation`
        )
        break
      }

      year++
    }
    // }) // end of year

    if (calculatedEndYear !== to)
      calculationMessage = `Cannot automate further drawdowns after ${calculatedEndYear}.  Some assets need to be sold.`

    const finalYear = year + 1
    const numOfCalculatedYears = calculatedEndYear - startingYear

    // for assets want to show the 'next' year.  for earnings we don't
    const calcYearRangeAssets = range(startingYear, calculatedEndYear + 1)
    const calcYearRangeEarnings = range(startingYear, calculatedEndYear)

    const assetForIncome = assets.find((it) => it.incomeBucket === true)
    if (!assetForIncome) throw new Error("No asset for income found") // this should be in validation section

    // SURPLUS ROW CALCULATION
    const surplusYearData: SurplusYearData[] = []
    calcYearRangeEarnings.forEach((year, index) => {
      const totalAutomatedAssetDrawdownAmtForYear = automatedDrawdownMap[year]
        ? automatedDrawdownMap[year].reduce((accum, it) => {
            return accum + it.value
          }, 0)
        : 0

      const totalExpensesAmt = totalExpenses[index].value || 0 // TODO: this is a hack - should typescript it

      let surplusAmt = Math.round(totalAutomatedAssetDrawdownAmtForYear - totalExpensesAmt)

      // This should be a final minor adjustment - if the surplus is -ve, take that amount from the income
      // bucket asset - this should be tax free as this should be like a drawdown.  If the surplus is +ve add it to the
      // income bucket asset
      // Note: it is possible that this is a huge amount if we only have one asset
      // const assetForIncome = assets.find((it) => it.incomeBucket === true)
      if (assetForIncome) {
        const historyItem = assetForIncome.getYearData(year + 1)
        historyItem.value = historyItem.value + surplusAmt
        historyItem.surplusAdjustment = surplusAmt

        surplusYearData.push({
          value: surplusAmt || 0,
          automatedAssetDrawdownAmt: totalAutomatedAssetDrawdownAmtForYear,
          adjustedAsset: assetForIncome.name,
          year
        })
      } else {
        throw new Error("cannot auto adjust - future calculations would be incorrect")
      }
    })

    const assetSplit = getAssetSplit(assets)

    const totalAssetsData = calcYearRangeAssets.map((year) => {
      const totalYearlyAssetAmt = assets.reduce((accum, it) => {
        const yearData = it.getYearData(year)
        return accum + yearData.value
      }, 0)
      return { year, value: totalYearlyAssetAmt }
    })

    const netPresentValue = totalAssetsData.map((it) => {
      const factor = inflationContext[it.year - 1] ? inflationContext[it.year - 1].factor : 1
      return { year: it.year, value: Math.round(it.value / factor) }
    })

    // NOW CREATE DATA IN FORMAT WHICH CAN BE USED BY THE FRONT END
    // TODO: THIS COULD BE MADE BETTER BY JUST PASSING INDIVIDUAL ROWS AND LETTING THE FRONT END DECIDE WHAT IT WANTS TO DO.

    const calculationData: CalculationData = {}

    const assetRowData = assets.reduce((accum: AssetData, asset) => {
      if (asset.capitalAsset) {
        accum[asset.name] = asset.history as CellData[]
      }
      return accum
    }, {})
    const graphCalculatedAssetData = { ...assetRowData } as AssetData
    const graphCalculatedAssetNpvData = getCalculatedNpvData(assets, inflationContext) // for graph purposes

    const earningsRowData = earningsFromAssets.reduce((accum: RowData, earning: Earning) => {
      accum[`${earning.name} (${earning.owner})`] = earning.history
      return accum
    }, {})

    const graphIncomeNpvData = getGraphIncomeNpvData(earningsFromAssets, inflationContext)

    const drawDownRowData = { "Asset drawdown": totalDrawdowns }

    const projectedLivingExpensesToDisplay = projectedLivingExpenses.splice(0, numOfCalculatedYears)
    const livingExpensesTodaysMoneyToDisplay = livingExpensesTodaysMoney.splice(0, numOfCalculatedYears)

    const cleanedTaxes = removeUnusedHistoryFromTaxes(taxes, finalYear)
    // console.log("--cleanedTaxes--", cleanedTaxes)
    const expensesRowData = cleanedTaxes.reduce(
      (accum: RowData, tax: Tax) => {
        accum[`Tax (${tax.owner})`] = tax.history
        return accum
      },

      {
        "Living expenses (today's money)": livingExpensesTodaysMoneyToDisplay,
        "Living expenses": projectedLivingExpensesToDisplay
      }
    )

    // expensesRowData["Total Expenses"] = totalExpenses

    const surplusRowData = { "Surplus (if -ve is tax liability for next yr)": surplusYearData }

    console.log("--yearRange--", calcYearRangeAssets)
    console.log("--calculationData--", calculationData)
    console.log("--graphCalculatedAssetData--", graphCalculatedAssetData)
    console.log("--assetRowData--", assetRowData)
    console.log("--earningsRowData--", earningsRowData)
    console.log("--drawDownRowData--", drawDownRowData)
    console.log("--expensesRowData--", expensesRowData)
    console.log("--surplusRowData--", surplusRowData)
    console.log("--inflationContext--", inflationContext)
    console.log("totalAssetsData", totalAssetsData)
    console.log("--netPresentValue--", netPresentValue)

    console.groupEnd()

    return {
      assetRowData,
      earningsRowData,
      drawDownRowData,
      expensesRowData,
      surplusRowData,
      calculationData,
      yearRange: calcYearRangeAssets,
      calculatedAssetData: graphCalculatedAssetData,
      calculatedAssetNpvData: graphCalculatedAssetNpvData,
      graphIncomeNpvData,
      assetSplit,
      calculationMessage,
      inflationContext,
      totalAssetsData,
      netPresentValue,
      totalEarningsData: totalEarnings,
      totalExpensesData: totalExpenses
    }
  } catch (e) {
    const getErrorMessage = (error: unknown) => {
      if (error instanceof Error) return error.message
      return String(error)
    }
    console.log("--e--", e)
    throw new Error(`Calculation error ${getErrorMessage(e)}`)
  }
}
