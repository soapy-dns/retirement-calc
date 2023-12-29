import { AssetClass } from "@/app/lib/calculations/types"
import { ShareCalculator } from "../calculator/ShareCalculator"
import { Asset } from "./Asset"
import { AssetConfig } from "./types"

const getCalculator = (assetConfig: AssetConfig) => {
  const { scenario, name: assetName } = assetConfig

  const {
    context: { sharesAu },
    transfers
  } = scenario
  if (!sharesAu) throw new Error(`Insufficient config to create a calculator ${assetName}`)

  return new ShareCalculator(sharesAu, assetConfig, transfers)
}

export class AuShares extends Asset {
  capitalAsset: boolean
  assetClass: AssetClass

  // TODO: Should we just have one asset class select the calculator and leave it to the calculator to get the config?
  constructor(props: AssetConfig) {
    super({ ...props, incomeProducing: true, calculator: getCalculator(props) })
    this.capitalAsset = true
    this.assetClass = AssetClass.shares
    const { value, startingYear } = props

    this.history.push({ value, year: startingYear, transferAmt: 0, income: 0 })
  }

  getAssetClass = () => {
    return AssetClass.shares
  }
}
