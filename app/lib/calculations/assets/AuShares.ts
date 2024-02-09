import { AssetClass } from "@/app/lib/calculations/types"
import { getPercDrawdownTaxable, getPercIncomeTaxable } from "../tax/utils"
import { Asset } from "./Asset"
import { AssetConfig, YearData } from "./types"
import { SharesContext, Transfer } from "../../data/schema/config"
import { filterTransfersForYear, getPartialTransfers, getFullTransfers } from "../transfers/transferUtils"



export class AuShares extends Asset {
  capitalAsset: boolean
  assetClass: AssetClass
  percOfEarningsTaxable: number
  percOfDrawdownTaxable: number
  transfers?: Transfer[]
  shareContext: SharesContext

  constructor(assetConfig: AssetConfig) {
    super({ ...assetConfig, incomeProducing: true })

    this.capitalAsset = true
    this.assetClass = AssetClass.shares

    const {
      value,
      startingYear,
      scenario: {
        transfers,
        context: { taxResident, sharesAu }
      }
    } = assetConfig
    this.shareContext = sharesAu
    this.transfers = transfers

    this.percOfEarningsTaxable = getPercIncomeTaxable(taxResident, assetConfig.country, this.assetClass)
    this.percOfDrawdownTaxable = getPercDrawdownTaxable(taxResident, assetConfig.country, this.assetClass)

    this.history.push({ value, year: startingYear, transferAmt: 0, income: 0 })
  }

  // call this for each year
  // lets us pass in value we need - e.g. could be total income earned across all assets
  calcNextYear = (yearData: YearData, assets: Asset[]): YearData => {
    const { value: prevValue, year } = yearData

    const transfersForYear = this.transfers ? filterTransfersForYear(this.transfers, year) : []

    const partialTransfersAmt = getPartialTransfers(this.id, transfersForYear)

    const fullTransfersAmt = getFullTransfers(this.id, yearData, transfersForYear, assets)

    const transferAmt = partialTransfersAmt + fullTransfersAmt

    const dividendIncome = (prevValue + transferAmt / 2) * this.shareContext.dividendInterestRate

    const growth = (prevValue + transferAmt / 2) * this.shareContext.growthInterestRate

    const value = prevValue + growth + transferAmt

    const nextYearData = {
      transferAmt,
      year: year + 1,
      growth: Math.round(growth),
      income: Math.round(dividendIncome),
      value: Math.round(value) // this will be gross
    }

    this.history.push(nextYearData)
    return nextYearData // TODO: do we need to return this?
  }

  getAssetClass = () => {
    return AssetClass.shares
  }
}
