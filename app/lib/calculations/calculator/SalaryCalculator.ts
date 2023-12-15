import { Asset } from "../assets/Asset"
import { AssetConfig, YearData } from "../assets/types"
import { DefinedBenefitsContext } from "../../data/types"
import { Calculator } from "./Calculator"
import { InflationContext } from "../types"

export class SalaryCalculator extends Calculator {
  protected config: DefinedBenefitsContext // context is the same, the difference is in the asset - when does it stop paying out.
  protected assetConfig: AssetConfig
  protected inflationContext: InflationContext

  constructor(config: DefinedBenefitsContext, assetConfig: AssetConfig, inflationContext: InflationContext) {
    super(assetConfig, [])

    this.config = config
    this.assetConfig = assetConfig
    this.inflationContext = inflationContext
  }

  // call this for each year
  calculate = (yearData: YearData, assets: Asset[]): YearData => {
    const { income: prevIncome, year } = yearData

    const { incomeEndYear } = this.assetConfig

    let newIncome
    if (incomeEndYear && incomeEndYear < year) {
      newIncome = 0
    } else {
      const inflationRate = this.inflationContext[year].inflation

      const indexationRate = this.config.indexationRate || inflationRate
      const increase = prevIncome * indexationRate
      newIncome = prevIncome + increase
    }

    return {
      year: year + 1,
      value: 0,
      income: Math.round(newIncome)
    }
  }
}
