import { Asset } from "./Asset"
import { CashCalculator } from "../calculator/CashCalculator"
import { AssetConfig } from "./types"
import { AssetClass } from "@/app/lib/calculations/types"

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

  constructor(props: AssetConfig) {
    super({ ...props, incomeProducing: true, calculator: getCalculator(props) })
    const { value, startingYear } = props

    this.capitalAsset = true

    this.history.push({ value, year: startingYear, income: 0, transferAmt: 0 })
  }

  getAssetClass = () => {
    return AssetClass.cash
  }
}
