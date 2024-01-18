import { Asset } from "../assets/Asset"
import { AssetConfig, YearData } from "../assets/types"
import { DefinedBenefitsContext } from "../../data/schema"
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
    const { year } = yearData

    const { incomeEndYear, incomeStartYear, income } = this.assetConfig

    let newIncome
    if (!income || (incomeEndYear && incomeEndYear < year) || (incomeStartYear && incomeStartYear > year)) {
      newIncome = 0
    } else {
      const inflationFactor = this.inflationContext[year - 1] ? this.inflationContext[year - 1].factor : 1

      newIncome = income * inflationFactor
    }

    return {
      year: year + 1,
      value: 0,
      income: Math.round(newIncome)
    }
  }
}
