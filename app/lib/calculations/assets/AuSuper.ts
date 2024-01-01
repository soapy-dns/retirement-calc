import { SuperCalculator } from "../calculator/SuperCalculator"
import { Asset } from "./Asset"
import { AssetClass } from "@/app/lib/calculations/types"
import { AssetConfig } from "./types"
import { getPercDrawdownTaxable, getPercIncomeTaxable } from "../tax/utils"

const getCalculator = (assetConfig: AssetConfig) => {
  const { scenario, name: assetName } = assetConfig
  const {
    context: { superAu },
    transfers
  } = scenario
  if (!superAu) throw new Error(`Insufficient config to create a calculator ${assetName}`)
  return new SuperCalculator(superAu, assetConfig, transfers)
}

export class AuSuper extends Asset {
  capitalAsset: boolean
  assetClass: AssetClass
  percOfEarningsTaxable: number
  percOfDrawdownTaxable: number

  constructor(assetConfig: AssetConfig) {
    super({ ...assetConfig, incomeProducing: false, calculator: getCalculator(assetConfig) })
    this.capitalAsset = true
    this.assetClass = AssetClass.super

    const {
      value,
      startingYear,
      scenario: {
        context: { taxResident }
      }
    } = assetConfig
    this.percOfEarningsTaxable = getPercIncomeTaxable(taxResident, assetConfig.country, this.assetClass)
    this.percOfDrawdownTaxable = getPercDrawdownTaxable(taxResident, assetConfig.country, this.assetClass)

    this.history.push({ value, year: startingYear, transferAmt: 0, income: 0 })
  }

  getAssetClass = () => {
    return AssetClass.super
  }
}
