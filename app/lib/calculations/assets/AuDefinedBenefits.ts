import { Asset } from "./Asset"
import { AssetClass, InflationContext } from "@/app/lib/calculations/types"
import { DefinedBenefitAssetProps, YearData } from "./types"
import { getPercDrawdownTaxable, getPercIncomeTaxable } from "../tax/utils"
import { DefinedBenefitsContext, Transfer } from "../../data/schema/config"

export class AuDefinedBenefits extends Asset {
  capitalAsset: boolean
  assetClass: AssetClass
  percOfEarningsTaxable: number
  percOfDrawdownTaxable: number
  definedBenefitsContext: DefinedBenefitsContext
  transfers?: Transfer[]
  incomeStartYear?: number
  incomeEndYear?: number
  income?: number // TODO: this should be mandatory and IAsset needs to be fixed
  inflationContext: InflationContext

  constructor(assetConfig: DefinedBenefitAssetProps, inflationContext: InflationContext) {
    // is income producing - it has to be - that is all it does
    super({
      ...assetConfig,
      incomeProducing: true,
      canDrawdown: false // can never drawdown from a defined benefit income stream
    })
    const {
      value,
      incomeStartYear,
      incomeEndYear,
      startingYear,
      income = 0,
      scenario: {
        context: { taxResident, definedBenefitsAu }
      }
    } = assetConfig
    this.capitalAsset = false
    this.assetClass = AssetClass.income_defined_benefit
    this.percOfEarningsTaxable = getPercIncomeTaxable(taxResident, assetConfig.country, this.assetClass)
    this.percOfDrawdownTaxable = getPercDrawdownTaxable(taxResident, assetConfig.country, this.assetClass)
    this.definedBenefitsContext = definedBenefitsAu
    this.income = income
    this.incomeStartYear = incomeStartYear
    this.incomeEndYear = incomeEndYear
    this.inflationContext = inflationContext

    // this is a hack to can recalc income
    const inflationRate = inflationContext[startingYear].inflation

    const indexationRate = definedBenefitsAu.useInflationRate
      ? definedBenefitsAu.indexationRate || inflationRate
      : inflationRate

    const previousYearsIncome = income / (1 + indexationRate)

    // I don't believe this should ever occur but typescript makes me.  maybe there is a better way
    // TODO: I think we can use factor?
    this.history.push({ value, year: startingYear, income: previousYearsIncome, transferAmt: 0 })
  }

  calcNextYear = (yearData: YearData, assets: Asset[]): YearData => {
    const { year } = yearData

    let newIncome

    if (
      !this.income ||
      (this.incomeEndYear && this.incomeEndYear < year) ||
      (this.incomeStartYear && this.incomeStartYear > year)
    ) {
      newIncome = 0
    } else {
      const inflationFactor = this.inflationContext[year - 1] ? this.inflationContext[year - 1].factor : 1

      newIncome = this.income * inflationFactor
    }

    const nextYearData = { year: year + 1, value: 0, income: Math.round(newIncome) }

    this.history.push(nextYearData)
    return nextYearData // TODO: do we need to return this?
  }

  getAssetClass = () => {
    return AssetClass.other
  }
}
