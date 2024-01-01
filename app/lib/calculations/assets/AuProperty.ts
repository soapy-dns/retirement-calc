import { Asset } from "./Asset"
import { AssetClass, InflationContext } from "@/app/lib/calculations/types"

import { PropertyCalculator } from "../calculator/PropertyCalculator"
import { AssetConfig } from "./types"
import { getPercDrawdownTaxable, getPercIncomeTaxable } from "../tax/utils"

const getCalculator = (assetConfig: AssetConfig, inflationContext: InflationContext) => {
  const { scenario } = assetConfig

  const {
    context: { property },
    transfers
  } = scenario
  return new PropertyCalculator(property, assetConfig, transfers, inflationContext)
}

export class AuProperty extends Asset {
  capitalAsset: boolean // if all assets have this, shouldn't it be in the Asset class
  assetClass: AssetClass
  percOfEarningsTaxable: number
  percOfDrawdownTaxable: number

  constructor(assetConfig: AssetConfig, inflationContext: InflationContext) {
    super({
      ...assetConfig,
      canDrawdown: false,
      incomeProducing: assetConfig.isRented || false,
      calculator: getCalculator(assetConfig, inflationContext)
    })
    // const { value, startingYear } = assetConfig
    const {
      value,
      startingYear,
      scenario: {
        context: { taxResident }
      }
    } = assetConfig

    this.capitalAsset = true
    this.assetClass = AssetClass.property
    this.percOfEarningsTaxable = getPercIncomeTaxable(taxResident, assetConfig.country, this.assetClass)
    this.percOfDrawdownTaxable = getPercDrawdownTaxable(taxResident, assetConfig.country, this.assetClass)

    this.history.push({ value, year: startingYear, transferAmt: 0, income: 0 })
  }

  getAssetClass = () => {
    return AssetClass.property
  }
}
