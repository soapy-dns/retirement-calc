import { Asset } from "./Asset"
import { AssetClass } from "@/app/lib/calculations/types"
import { AssetConfig, YearData } from "./types"
import { getPercDrawdownTaxable, getPercIncomeTaxable } from "../tax/utils"
import { SuperContext, Transfer } from "../../data/schema/config"
import { getTransferAmt } from "../transfers/getTransfers"

// const getFullTransfers = (transfers: Transfer[]) => {
//   return 0
// }

export class AuSuper extends Asset {
  capitalAsset: boolean
  assetClass: AssetClass
  percOfEarningsTaxable: number
  percOfDrawdownTaxable: number
  transfers?: Transfer[]
  superContext: SuperContext

  constructor(assetConfig: AssetConfig) {
    super({ ...assetConfig, incomeProducing: false })
    this.capitalAsset = true
    this.assetClass = AssetClass.super

    const {
      value,
      startingYear,
      scenario: {
        transfers,
        context: { taxResident, superAu }
      }
    } = assetConfig
    this.percOfEarningsTaxable = getPercIncomeTaxable(taxResident, assetConfig.country, this.assetClass)
    this.percOfDrawdownTaxable = getPercDrawdownTaxable(taxResident, assetConfig.country, this.assetClass)
    this.transfers = transfers
    this.superContext = superAu

    this.history.push({ value, year: startingYear, transferAmt: 0, income: 0 })
  }

  calcNextYear = (yearData: YearData, assets: Asset[]): YearData => {
    const { value: prevValue, year } = yearData

    const transferAmt = getTransferAmt(this.id, yearData, this.transfers, assets)

    const income = (prevValue + transferAmt / 2) * this.superContext.investmentReturn

    const taxOnIncome = income * this.superContext.taxationRate

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
    return AssetClass.super
  }
}
