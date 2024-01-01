import { Asset } from "./Asset"
import { AssetClass, InflationContext } from "@/app/lib/calculations/types"
import { AssetConfig, DefinedBenefitAssetProps } from "./types"
import { SalaryCalculator } from "../calculator/SalaryCalculator"
import { getPercDrawdownTaxable, getPercIncomeTaxable } from "../tax/utils"

const getCalculator = (assetConfig: AssetConfig, inflationContext: InflationContext) => {
  const { scenario, name: assetName } = assetConfig
  const {
    context: { definedBenefitsAu }
  } = scenario
  if (!definedBenefitsAu) throw new Error(`Insufficient config to create a calculator ${assetName}`)

  return new SalaryCalculator(definedBenefitsAu, assetConfig, inflationContext)
}

export class Salary extends Asset {
  capitalAsset: boolean
  assetClass: AssetClass
  percOfEarningsTaxable: number
  percOfDrawdownTaxable: number

  constructor(assetConfig: DefinedBenefitAssetProps, inflationContext: InflationContext) {
    // is income producing - it has to be - that is all it does
    super({
      ...assetConfig,
      incomeProducing: true,
      canDrawdown: false, // can never drawdown from a defined benefit income stream
      calculator: getCalculator(assetConfig, inflationContext)
    })
    this.capitalAsset = false
    this.assetClass = AssetClass.income_salary
    const { value, startingYear, income = 0, scenario } = assetConfig
    const {
      context: { taxResident, definedBenefitsAu }
    } = scenario
    this.percOfEarningsTaxable = getPercIncomeTaxable(taxResident, assetConfig.country, this.assetClass)
    this.percOfDrawdownTaxable = getPercDrawdownTaxable(taxResident, assetConfig.country, this.assetClass)

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
