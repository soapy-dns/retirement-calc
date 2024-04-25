import { Asset } from "./Asset"
import { YearData } from "../assets/types"
import { AssetGroup } from "@/app/lib/calculations/types"
import { getPercDrawdownTaxable, getPercIncomeTaxable } from "../tax/utils"
import { CashContext, IAsset, IScenario, Transfer } from "../../data/schema/config"
import { getTransferAmt } from "../transfers/getTransferAmt"

export class AuBank extends Asset {
  capitalAsset: boolean
  assetGroup: AssetGroup
  percOfIncomeTaxable: number
  percOfDrawdownTaxable: number
  cashContext: CashContext
  transfers?: Transfer[]

  constructor(assetConfig: IAsset, startingYear: number, scenario: IScenario) {
    if (assetConfig.className !== "AuBank") throw new Error("Invalid config for Cash")

    super({ ...assetConfig, incomeProducing: true })
    const {
      transfers,
      context: { auBank, taxResident }
    } = scenario

    this.cashContext = auBank
    this.transfers = transfers

    this.capitalAsset = true
    this.assetGroup = AssetGroup.cash
    this.percOfIncomeTaxable = getPercIncomeTaxable(taxResident, assetConfig.country, this.assetGroup)
    this.percOfDrawdownTaxable = getPercDrawdownTaxable(taxResident, assetConfig.country, this.assetGroup)

    this.history.push({ value: assetConfig.value, year: startingYear, income: 0, transferAmt: 0 })
  }

  calcNextYear = (yearData: YearData, assets: Asset[]): YearData => {
    const { value: prevValue, year } = yearData

    const investmentReturn = this.rateVariation
      ? this.cashContext.interestRate + this.rateVariation
      : this.cashContext.interestRate

    const transferAmt = getTransferAmt(this.id, yearData, this.transfers, assets)

    const income = (prevValue + transferAmt / 2) * investmentReturn

    const value = prevValue + transferAmt // note does not add income just yet
    const incomeCalc = `(${prevValue} + ${transferAmt}/2) * ${investmentReturn}`

    const nextYearData = {
      year: year + 1,
      income: Math.round(income),
      value: Math.round(value), // this will be gross
      transferAmt,
      incomeCalc
    }

    this.history.push(nextYearData)
    return nextYearData // TODO: do we need to return this?
  }

  getAssetClass = () => {
    return AssetGroup.cash
  }
}
