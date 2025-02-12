"use server"

import range from "lodash/range.js"
import { canDrawdownAssets } from "./assets/assetUtils"
import { AssetIncome } from "./assets/types"
import { getYearRange } from "./utils/getYearRange"
import { AssetData, AssetSplitItem, CalculationResults, SurplusYearData, YearData } from "./types"
import { getAssetSplitByYear } from "./assets/getAssetClasses"
import { getCalculatedNpvData, getGraphIncomeNpvData } from "./utils/getCalculatedNpvData"
import { getAutoDrawdownCellData } from "./autoDrawdowns/getAutoDrawdownCellData"
import { CalculationError } from "@/app/lib/utils/CalculationError"
import { isCapitalAsset } from "@/app/ui/utils"
import { accumToBasicYearData } from "./utils/accumToBasicYearData"
import { getIncomeByOwner } from "./utils/getIncomeByOwner"
import { getTaxDetailsByOwner } from "./utils/getTaxDetailsByOwner"
import { getAccumulatedData, getAccumulatedNPVData } from "./tax/getAccumulatedTaxData"
import { getInflationFactor } from "./utils/getInflationFactor"
import { removeUnusedHistory } from "./utils/removeUnusedHistory"
import { applyStressTests } from "./stressTests/applyStressTests"
import { log } from "console"
import { initialiseCalculation } from "./initialiseCalculation"
import { doCalculationsForYear } from "./doCalculationsForYear"
import { ScenarioSchema } from "../data/schema/config"
import { getAssetSplit } from "./getAssetSplit"

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message
  return String(error)
}

export const calculate = async (data: unknown): Promise<CalculationResults> => {
  await sleep(1)
  // console.log("--calculate data--", JSON.stringify(data, null, 4))
  // console.log("--data.context--", data.context);
  // const stressTestValues = stressTestOptions.map((it) => {
  //   return it.value
  // })

  const result = ScenarioSchema.safeParse(data)

  if (!result.success) {
    const firstCustomError = result.error.issues.find((it) => it.code === "custom")

    console.log("--firstCustomError--", firstCustomError)

    console.log("Validation errors ---> ", result.error.issues)
    return {
      success: false,
      calculationMessage: firstCustomError?.message || "Invalid configuration",
      errors: result.error.issues
    }
  }

  const scenario = applyStressTests(result.data)
  if (!scenario) throw new Error("No scenario found")

  const { asAtYear } = scenario

  try {
    let calculationMessage = ""

    const startingYear = asAtYear

    const { context: contextConfig } = scenario
    const { numOfYears, owners } = contextConfig

    const { yearRange, to } = getYearRange(startingYear, numOfYears)

    const {
      totalDrawdowns,
      totalAssetIncome,
      totalExpenses,
      automatedDrawdownMap,
      inflationContext,
      livingExpensesTodaysMoney,
      projectedLivingExpenses,
      assets,
      incomeTaxCalculator,
      earningsTaxCalculator,
      taxes,
      earningsTaxes,
      incomeFromAssets
    } = initialiseCalculation(scenario, yearRange)

    let year = startingYear
    let calculatedEndYear = startingYear
    while (year < to && canDrawdownAssets(assets, year)) {
      calculatedEndYear = year + 1

      const remainingAmtToDrawdown = doCalculationsForYear({
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
      })
      if (remainingAmtToDrawdown > 100) {
        // console.log(
        //   `REMAINING AMOUNT TO DRAWDOWN = ${remainingAmtToDrawdown} for year ${year} - stopping further calculation`
        // )
        break
      }

      year++
    }
    // }) // end of year

    if (calculatedEndYear !== to)
      calculationMessage = `Cannot automate further capital asset drawdowns after ${calculatedEndYear}.  
      Some assets will need to be sold.  (Go to the Transfers on the 'Configuration' page)`

    // log("calculatedEndYear, year", calculatedEndYear, year)
    const finalAssetYear = calculatedEndYear
    const numOfCalculatedYears = calculatedEndYear - startingYear

    // for assets want to show the 'next' year.  for income we don't
    const calcYearRangeAssets = range(startingYear, calculatedEndYear + 1)
    const calcYearRangeIncome = range(startingYear, calculatedEndYear)

    const assetForIncome = assets.find((it) => it.incomeBucket === true)
    if (!assetForIncome) throw new Error("No asset for income found") // this should be in validation section

    // SURPLUS ROW CALCULATION
    const surplusYearData: SurplusYearData[] = []
    calcYearRangeIncome.forEach((year, index) => {
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

    const assetSplitYearly = getAssetSplit(assets, calcYearRangeAssets)

    const totalAssetsData = calcYearRangeAssets.map((year) => {
      const totalYearlyAssetAmt = assets.reduce((accum, it) => {
        const yearData = it.getYearData(year)
        return accum + yearData.value
      }, 0)
      return { year, value: totalYearlyAssetAmt }
    })

    const netPresentValue = totalAssetsData.map((it) => {
      const factor = getInflationFactor(it.year, inflationContext)

      return { year: it.year, value: Math.round(it.value / factor) }
    })

    // NOW CREATE DATA IN FORMAT WHICH CAN BE USED BY THE FRONT END
    const assetRowData: AssetData = assets.reduce((accum: AssetData, asset) => {
      if (asset.capitalAsset) {
        accum[asset.name] = asset.history.map((it: YearData) => {
          return { year: it.year, value: it.value }
        })
      }
      return accum
    }, {})
    const graphCalculatedAssetData = { ...assetRowData } as AssetData
    const graphCalculatedAssetNpvData = getCalculatedNpvData(assets, inflationContext) // for graph purposes

    const assetIncomeRowData = incomeFromAssets.reduce((accum: AssetData, assetIncome: AssetIncome) => {
      const ownerName = owners.find((owner) => owner.identifier === assetIncome.ownerId)?.ownerName || "Unknown"
      accum[`${assetIncome.name} - ${ownerName}`] = assetIncome.history
      return accum
    }, {})

    const incomeByOwner: AssetData = getIncomeByOwner({ owners, incomeFromAssets })

    const taxDetailsByOwner = getTaxDetailsByOwner({ owners, taxes })
    const totalTaxableAmtDataByOwner = Object.entries(taxDetailsByOwner).reduce((accum, [ownerName, taxDetails]) => {
      const yearData = taxDetails.map((it) => {
        return { year: it.year, value: it.totalTaxableAmt }
      })
      accum[ownerName] = yearData
      return accum
    }, {} as AssetData)

    const graphIncomeNpvData = getGraphIncomeNpvData(incomeFromAssets, inflationContext)

    const drawdownData = getAutoDrawdownCellData(totalDrawdowns, calcYearRangeIncome)

    const projectedLivingExpensesToDisplay = projectedLivingExpenses.splice(0, numOfCalculatedYears)
    const livingExpensesTodaysMoneyToDisplay = livingExpensesTodaysMoney.splice(0, numOfCalculatedYears)

    // TODO: MIGHT WANT TO REINSTATE THIS
    // const earningsTaxName = getEarningsTaxName(taxResident)

    // const incomeTaxRows = withData(getTaxesRows(taxes, finalYear, "Income Tax"))
    // console.log("--incomeTaxRows--", incomeTaxRows)
    // console.log("--taxes--", taxes)
    // const earningTaxRows = withData(getTaxesRows(earningsTaxes, finalYear, earningsTaxName))

    // TODO: warning - if change this other things may break.  should be a key.
    const livingExpensesRows = {
      "Living expenses (today's money)": livingExpensesTodaysMoneyToDisplay,
      "Living expenses": projectedLivingExpensesToDisplay
    }

    const incomeTaxesByOwner = owners.reduce((accum, owner) => {
      const ownerTaxes = taxes.filter((it) => it.ownerId === owner.identifier)
      accum[owner.ownerName] = accumToBasicYearData(ownerTaxes.map((it) => it.history).flat() || 0)
      return accum
    }, {} as AssetData)

    const incomeTaxesYearData = accumToBasicYearData(taxes.map((it) => it.history).flat())
    const earningsTaxesYearData = accumToBasicYearData(earningsTaxes.map((it) => it.history).flat())

    const totalTaxesYearData = accumToBasicYearData(incomeTaxesYearData.concat(earningsTaxesYearData))

    const accumulatedTaxData = removeUnusedHistory(getAccumulatedData(totalTaxesYearData), finalAssetYear)
    const accumulatedNpvTaxData = removeUnusedHistory(
      getAccumulatedNPVData({
        yearData: totalTaxesYearData,
        inflationContext
      }),
      finalAssetYear
    )

    // const expensesRowData = { ...incomeTaxRows, ...earningTaxRows, ...livingExpensesRows }
    const expensesRowData = { ...livingExpensesRows }

    const surplusRowData = { Surplus: surplusYearData }

    // const surplusRowData = { "Surplus (if -ve is tax liability for next yr)": surplusYearData }

    return {
      success: true,
      assetRowData,
      assetIncomeRowData,
      drawdownRowData: drawdownData,
      totalDrawdownData: totalDrawdowns,
      expensesRowData,
      surplusRowData,
      yearRange: calcYearRangeAssets,
      calculatedAssetData: graphCalculatedAssetData,
      calculatedAssetNpvData: graphCalculatedAssetNpvData,
      graphIncomeNpvData,
      assetSplitYearly,
      calculationMessage,
      inflationContext,
      totalAssetsData,
      netPresentValue,
      totalAssetIncome,
      totalExpensesData: totalExpenses,
      incomeTaxesData: incomeTaxesYearData,
      earningsTaxesData: earningsTaxesYearData,
      totalTaxesData: totalTaxesYearData,
      incomeTaxesByOwner,
      incomeByOwner,
      totalTaxableAmtDataByOwner,
      accumulatedTaxData,
      accumulatedNpvTaxData
    }
  } catch (e) {
    if (e instanceof CalculationError) {
      const errMsg = getErrorMessage(e)

      return {
        success: false,
        calculationMessage: errMsg
      }
    }
    console.log("**SERVER ERROR**", e)

    // if (e instanceof Error) {

    //   console.log("**SERVER ERROR**", e.message)
    // } else {
    //   console.log("**SERVER ERROR**", e)
    // }
    throw new Error("SERVER ERROR")
  }
}
