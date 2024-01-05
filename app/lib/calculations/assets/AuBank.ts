import { Asset } from "./Asset"
import { CashCalculator } from "../calculator/CashCalculator"
import { AssetConfig } from "./types"
import { AssetClass } from "@/app/lib/calculations/types"
import { getPercDrawdownTaxable, getPercIncomeTaxable } from "../tax/utils"

const getCalculator = (assetConfig: AssetConfig) => {
  const { scenario } = assetConfig
  const {
    transfers,
    context: { auBank }
  } = scenario
  return new CashCalculator(auBank, assetConfig, transfers)
}

export class AuBank extends Asset {
  capitalAsset: boolean
  assetClass: AssetClass
  percOfEarningsTaxable: number
  percOfDrawdownTaxable: number

  constructor(assetConfig: AssetConfig) {
    super({ ...assetConfig, incomeProducing: true, calculator: getCalculator(assetConfig) })
    const {
      value,
      startingYear,
      scenario: {
        context: { taxResident }
      }
    } = assetConfig

    this.capitalAsset = true
    this.assetClass = AssetClass.cash
    this.percOfEarningsTaxable = getPercIncomeTaxable(taxResident, assetConfig.country, this.assetClass)
    this.percOfDrawdownTaxable = getPercDrawdownTaxable(taxResident, assetConfig.country, this.assetClass)

    this.history.push({ value, year: startingYear, income: 0, transferAmt: 0 })
  }

  getAssetClass = () => {
    return AssetClass.cash
  }
}
