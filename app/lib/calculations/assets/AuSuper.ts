import { Asset } from "./Asset"
import { AssetGroup } from "@/app/lib/calculations/types"
import { YearData } from "./types"
import { getPercIncomeTaxable } from "../tax/utils"
import { IAsset, IScenario, SuperContext, Transfer } from "../../data/schema/config"
// import { getNetTransferAmt } from "../transfers/getNetTransferAmt"
import { getNetTransferAmtForYear } from "../transfers/getNetTransferAmtForYear"

import { getInvestmentTax } from "../tax/taxCalcs/SuperTaxCalc"
import { getPercentageOfDrawdownTaxable } from "../tax/getPercentageOfDrawdownTaxable"

export class AuSuper extends Asset {
  capitalAsset: boolean
  assetGroup: AssetGroup
  percOfIncomeTaxable: number
  percOfDrawdownTaxable: number
  transfers: Transfer[]
  superContext: SuperContext

  // TODO: instead of passing in the entire scenario, we should maybe just pass
  // in the relevant context config
  constructor(assetConfig: IAsset, startingYear: number, scenario: IScenario) {
    if (assetConfig.className !== "AuSuper") throw new Error("Invalid config for Super")

    super({ ...assetConfig, incomeProducing: false })

    this.capitalAsset = true
    this.assetGroup = AssetGroup.super

    const {
      transfers,
      context: { taxResident, superAu }
    } = scenario
    this.percOfIncomeTaxable = getPercIncomeTaxable(taxResident, assetConfig.country, this.assetGroup)
    this.percOfDrawdownTaxable = getPercentageOfDrawdownTaxable(taxResident, assetConfig.country, this.assetGroup)

    this.transfers = transfers || []
    this.superContext = superAu

    this.history.push({ value: assetConfig.value, year: startingYear, transferAmt: 0, income: 0 })
  }

  calcNextYear = (yearData: YearData, assets: Asset[]): YearData => {
    const { value: prevValue, year } = yearData

    const investmentReturn = this.rateVariation
      ? this.superContext.investmentReturn + this.rateVariation
      : this.superContext.investmentReturn

    const incomeFirstHalf = (prevValue * investmentReturn) / 2
    const taxOnIncomeFirstHalf = getInvestmentTax(incomeFirstHalf, this.country)
    const valueHalfWay = Math.round(prevValue + incomeFirstHalf - taxOnIncomeFirstHalf)

    const transferAmt = getNetTransferAmtForYear(year, this.transfers, this.id, valueHalfWay, assets)

    const valueAfterTransfer = valueHalfWay + transferAmt

    const incomeSecondHalf = (valueAfterTransfer * investmentReturn) / 2

    const taxOnIncomeSecondHalf = getInvestmentTax(incomeSecondHalf, this.country)

    const valueAtEnd = valueAfterTransfer + incomeSecondHalf - taxOnIncomeSecondHalf

    const totalIncome = incomeFirstHalf + incomeSecondHalf

    const totalTaxOnIncome = taxOnIncomeFirstHalf + taxOnIncomeSecondHalf

    // const transferAmt = getNetTransferAmtForYear(year, this.transfers, this.id, prevValue, assets)

    // const income = (prevValue + transferAmt / 2) * investmentReturn

    // const taxOnIncome = getInvestmentTax(income, this.country)

    // const value = prevValue + income + transferAmt - taxOnIncome

    // if (year === 2026 && this.name === "Australian Retirement Trust - Neil") {
    // console.log("************2026 super** income", this.name, income, transferAmt)
    // console.log(`value = ${prevValue} + ${income} + ${transferAmt} - ${taxOnIncome} = ${value}`)
    // }

    const nextYearData = {
      year: year + 1,
      transferAmt,
      value: Math.round(valueAtEnd),
      income: Math.round(totalIncome), //TODO: for fixed benefit test
      taxOnIncome: Math.round(totalTaxOnIncome) // Is tax always 15% irrespective?
    }
    // if (year === 2026 && this.name === "Australian Retirement Trust - Neil") {
    // console.log(`incomeFirstHalf: ${incomeFirstHalf}, taxOnIncomeFirstHalf: ${taxOnIncomeFirstHalf}`)
    // console.log(
    //   `---- preValue ${prevValue}, investmentReturn: ${investmentReturn}, incomeFirstHalf: ${incomeFirstHalf}, valueHalfWay: ${valueHalfWay}, transferAmt: ${transferAmt}, valueAfterTransfer: ${valueAfterTransfer}`
    // )
    //   // console.log("**2025 super** nextYearData", this.name, nextYearData)
    // }

    this.history.push(nextYearData)
    return nextYearData // TODO: do we need to return this?
  }

  getAssetClass = () => {
    return AssetGroup.super // TODO: super is not a group.  It can be invested in cash or shares.
  }
}
