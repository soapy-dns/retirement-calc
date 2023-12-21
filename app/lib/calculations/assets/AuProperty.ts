import { Asset } from "./Asset"
import { AssetClass, InflationContext } from "@/app/lib/calculations/types"

import { PropertyCalculator } from "../calculator/PropertyCalculator"
import { AssetConfig } from "./types"

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

  constructor(assetConfig: AssetConfig, inflationContext: InflationContext) {
    super({
      ...assetConfig,
      canDrawdown: false,
      incomeProducing: assetConfig.isRented || false,
      calculator: getCalculator(assetConfig, inflationContext)
    })
    const { value, startingYear } = assetConfig

    this.capitalAsset = true

    this.history.push({ value, year: startingYear, transferAmt: 0, income: 0 })
  }

  getAssetClass = () => {
    return AssetClass.property
  }
}
