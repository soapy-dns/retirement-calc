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

    // const transferAmt = getNetTransferAmt(this.id, yearData, this.transfers, assets)
    const transferAmt = getNetTransferAmtForYear(year, this.transfers, this.id, prevValue, assets)

    const income = (prevValue + transferAmt / 2) * investmentReturn

    const taxOnIncome = getInvestmentTax(income, this.country)

    const value = prevValue + income + transferAmt - taxOnIncome

    const nextYearData = {
      year: year + 1,
      transferAmt,
      value: Math.round(value),
      income: Math.round(income), //TODO: for fixed benefit test
      taxOnIncome: Math.round(taxOnIncome) // Is tax always 15% irrespective?
    }
    // if (year === 2024 && this.name === "Australian Retirement Trust") {
    //   console.log("**2025 super** nextYearData", this.name, nextYearData)
    // }

    this.history.push(nextYearData)
    return nextYearData // TODO: do we need to return this?
  }

  getAssetClass = () => {
    return AssetGroup.super // TODO: super is not a group.  It can be invested in cash or shares.
  }
}
