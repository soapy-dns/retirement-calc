import { Asset } from "./Asset"
import { AssetConfig, YearData } from "../assets/types"
import { AssetClass } from "@/app/lib/calculations/types"
import { getPercDrawdownTaxable, getPercIncomeTaxable } from "../tax/utils"
import { filterTransfersForYear, getPartialTransfers, getFullTransfers } from "../transfers/transferUtils"
import { CashContext, Transfer } from "../../data/schema/config"
import { getStartingYear } from "../utils/getStartingYear"

export class AuBank extends Asset {
  capitalAsset: boolean
  assetClass: AssetClass
  percOfEarningsTaxable: number
  percOfDrawdownTaxable: number
  cashContext: CashContext
  transfers?: Transfer[]

  // TODO: transfers and scenario shouldn't really be passed down into this.
  // scenario is passed in just for context and transfers
  constructor(assetConfig: AssetConfig) {
    super({ ...assetConfig, incomeProducing: true })
    const { scenario, value } = assetConfig
    const {
      transfers,
      context: { auBank, taxResident }
    } = scenario
    this.cashContext = auBank
    this.transfers = transfers // TODO: there has to be a better way!

    this.capitalAsset = true
    this.assetClass = AssetClass.cash
    this.percOfEarningsTaxable = getPercIncomeTaxable(taxResident, assetConfig.country, this.assetClass)
    this.percOfDrawdownTaxable = getPercDrawdownTaxable(taxResident, assetConfig.country, this.assetClass)

    const startingYear = getStartingYear()

    this.history.push({ value, year: startingYear, income: 0, transferAmt: 0 })
  }

  calcNextYear = (yearData: YearData, assets: Asset[]): YearData => {
    const { value: prevValue, year } = yearData

    const transfersForYear = this.transfers ? filterTransfersForYear(this.transfers, year) : []

    const partialTransfersAmt = getPartialTransfers(this.id, transfersForYear)

    const fullTransfersAmt = getFullTransfers(this.id, yearData, transfersForYear, assets)

    const transferAmt = partialTransfersAmt + fullTransfersAmt

    const income = (prevValue + transferAmt / 2) * this.cashContext.interestRate

    const value = prevValue + transferAmt // note does not add income just yet
    const incomeCalc = `(${prevValue} + ${transferAmt}/2) * ${this.cashContext.interestRate}`

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
    return AssetClass.cash
  }
}
