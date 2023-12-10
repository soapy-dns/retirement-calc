import { DefinedBenefitsCalculator } from "../calculator/DefinedBenefitCalculator"
import { Asset } from "./Asset"
import { AssetClass, InflationContext } from "@/app/lib/calculations/types"

import { AssetConfig, DefinedBenefitAssetProps } from "./types"

const getCalculator = (assetConfig: AssetConfig, inflationContext: InflationContext) => {
  const { scenario, name: assetName } = assetConfig
  const {
    context: { definedBenefitsAu }
  } = scenario
  if (!definedBenefitsAu) throw new Error(`Insufficient config to create a calculator ${assetName}`)

  return new DefinedBenefitsCalculator(definedBenefitsAu, assetConfig, inflationContext)
}

export class AuDefinedBenefits extends Asset {
  capitalAsset: boolean

  constructor(props: DefinedBenefitAssetProps, inflationContext: InflationContext) {
    // is income producing - it has to be - that is all it does
    super({
      ...props,
      incomeProducing: true,
      canDrawdown: false, // can never drawdown from a defined benefit income stream
      calculator: getCalculator(props, inflationContext)
    })
    this.capitalAsset = false

    const { value, startingYear, income = 0, scenario } = props
    const {
      context: { definedBenefitsAu }
    } = scenario

    // this is a hack to can recalc income
    const inflationRate = inflationContext[startingYear].inflation

    const indexationRate = definedBenefitsAu.useInflationRate
      ? definedBenefitsAu.indexationRate || inflationRate
      : inflationRate

    const previousYearsIncome = income / (1 + indexationRate)

    // I don't believe this should ever occur but typescript makes me.  maybe there is a better way
    this.history.push({ value, year: startingYear, income: previousYearsIncome, transferAmt: 0 })
  }
  getAssetClass = () => {
    return AssetClass.other
  }
}
