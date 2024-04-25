import { Asset } from "./Asset"
import { AssetGroup } from "@/app/lib/calculations/types"
import { YearData } from "./types"
import { getPercDrawdownTaxable, getPercIncomeTaxable } from "../tax/utils"
import { IAsset, IScenario, SuperContext, Transfer } from "../../data/schema/config"
import { getTransferAmt } from "../transfers/getTransferAmt"
import { getSuperIncomeTax } from "../tax/taxCalcs/SuperTaxCalc"

export class AuSuper extends Asset {
  capitalAsset: boolean
  assetGroup: AssetGroup
  percOfIncomeTaxable: number
  percOfDrawdownTaxable: number
  transfers?: Transfer[]
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
    this.percOfDrawdownTaxable = getPercDrawdownTaxable(taxResident, assetConfig.country, this.assetGroup)

    this.transfers = transfers
    this.superContext = superAu

    this.history.push({ value: assetConfig.value, year: startingYear, transferAmt: 0, income: 0 })
  }

  calcNextYear = (yearData: YearData, assets: Asset[]): YearData => {
    const { value: prevValue, year } = yearData

    const investmentReturn = this.rateVariation
      ? this.superContext.investmentReturn + this.rateVariation
      : this.superContext.investmentReturn

    const transferAmt = getTransferAmt(this.id, yearData, this.transfers, assets)

    const income = (prevValue + transferAmt / 2) * investmentReturn

    const taxOnIncome = getSuperIncomeTax(income, this.country)

    const value = prevValue + income + transferAmt - taxOnIncome

    const nextYearData = {
      year: year + 1,
      transferAmt,
      value: Math.round(value),
      income: Math.round(income) //TODO: for fixed benefit test
    }

    this.history.push(nextYearData)
    return nextYearData // TODO: do we need to return this?
  }

  getAssetClass = () => {
    return AssetGroup.super
  }
}
