import { SuperCalculator } from "../calculator/SuperCalculator"
import { Asset } from "./Asset"
import { AssetClass } from "@/app/lib/calculations/types"
import { AssetConfig } from "./types"

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

  constructor(props: AssetConfig) {
    super({ ...props, incomeProducing: false, calculator: getCalculator(props) })
    this.capitalAsset = true
    this.assetClass = AssetClass.super

    const { value, startingYear } = props

    this.history.push({ value, year: startingYear, transferAmt: 0, income: 0 })
  }

  getAssetClass = () => {
    return AssetClass.super
  }
}
