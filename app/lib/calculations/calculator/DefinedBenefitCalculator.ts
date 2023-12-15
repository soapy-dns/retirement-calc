import { Asset } from "../assets/Asset"
import { AssetConfig, YearData } from "../assets/types"
import { DefinedBenefitsContext } from "../../data/types"
import { Calculator } from "./Calculator"
import { InflationContext } from "../types"

/**
 * For super tax gets taken off at source so is not included in income tax
 */
export class DefinedBenefitsCalculator extends Calculator {
  protected config: DefinedBenefitsContext
  protected inflationContext: InflationContext

  constructor(config: DefinedBenefitsContext, assetConfig: AssetConfig, inflationContext: InflationContext) {
    super(assetConfig, [])

    this.config = config
    this.inflationContext = inflationContext
  }

  // call this for each year
  calculate = (yearData: YearData, assets: Asset[]): YearData => {
    const { income: prevIncome, year } = yearData

    const inflationRate = this.inflationContext[year].inflation

    const indexationRate = this.config.indexationRate || inflationRate
    const increase = prevIncome * indexationRate
    const newIncome = prevIncome + increase

    return {
      year: year + 1,
      value: 0,
      income: Math.round(newIncome)
    }
  }
}
