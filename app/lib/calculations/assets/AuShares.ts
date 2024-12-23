import { AssetGroup } from "@/app/lib/calculations/types"
import { getPercIncomeTaxable } from "../tax/utils"
import { Asset } from "./Asset"
import { YearData } from "./types"
import { IAsset, IScenario, SharesContext, Transfer } from "../../data/schema/config"
import { getNetTransferAmt } from "../transfers/getNetTransferAmt"
import { getPercentageOfDrawdownTaxable } from "../tax/getPercentageOfDrawdownTaxable"

export class AuShares extends Asset {
  capitalAsset: boolean
  assetGroup: AssetGroup
  percOfIncomeTaxable: number
  percOfDrawdownTaxable: number
  transfers?: Transfer[]
  shareContext: SharesContext

  constructor(assetConfig: IAsset, startingYear: number, scenario: IScenario) {
    if (assetConfig.className !== "AuShares") throw new Error("Invalid config for Property")

    super({ ...assetConfig, incomeProducing: true })

    this.capitalAsset = true
    this.assetGroup = AssetGroup.shares

    const {
      transfers,
      context: { taxResident, sharesAu }
    } = scenario

    const { value } = assetConfig
    this.shareContext = sharesAu
    this.transfers = transfers

    this.percOfIncomeTaxable = getPercIncomeTaxable(taxResident, assetConfig.country, this.assetGroup)
    this.percOfDrawdownTaxable = getPercentageOfDrawdownTaxable(taxResident, assetConfig.country, this.assetGroup)

    this.history.push({ value, year: startingYear, transferAmt: 0, income: 0 })
  }

  // call this for each year
  // lets us pass in value we need - e.g. could be total income earned across all assets
  calcNextYear = (yearData: YearData, assets: Asset[]): YearData => {
    const { value: prevValue, year } = yearData

    const transferAmt = getNetTransferAmt(this.id, yearData, this.transfers, assets)

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
    return AssetGroup.shares
  }
}
