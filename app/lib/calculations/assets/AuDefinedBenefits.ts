import { Asset } from "./Asset"
import { AssetGroup, InflationContext } from "@/app/lib/calculations/types"
import { getPercDrawdownTaxable, getPercIncomeTaxable } from "../tax/utils"
import { DefinedBenefitsContext, IAsset, IScenario, Transfer } from "../../data/schema/config"
import { YearData } from "./types"

export class AuDefinedBenefits extends Asset {
  capitalAsset: boolean
  assetGroup: AssetGroup
  percOfEarningsTaxable: number
  percOfDrawdownTaxable: number
  definedBenefitsContext: DefinedBenefitsContext
  transfers?: Transfer[]
  incomeStartYear?: number
  incomeEndYear?: number
  incomeAmount: number
  inflationContext: InflationContext

  constructor(assetConfig: IAsset, startingYear: number, scenario: IScenario, inflationContext: InflationContext) {
    // is income producing - it has to be - that is all it does
    super({ ...assetConfig, incomeProducing: true })

    if (assetConfig.className !== "AuDefinedBenefits") throw new Error("Invalid config for Defined Benefits")

    const {
      transfers,
      context: { taxResident, definedBenefitsAu }
    } = scenario

    this.capitalAsset = false
    this.assetGroup = AssetGroup.income_defined_benefit
    this.percOfEarningsTaxable = getPercIncomeTaxable(taxResident, assetConfig.country, this.assetGroup)
    this.percOfDrawdownTaxable = getPercDrawdownTaxable(taxResident, assetConfig.country, this.assetGroup)
    this.definedBenefitsContext = definedBenefitsAu

    const { income } = assetConfig
    const { incomeStartYear, incomeEndYear, incomeAmt: incomeAmount } = income
    this.incomeStartYear = incomeStartYear
    this.incomeEndYear = incomeEndYear
    this.incomeAmount = incomeAmount
    this.inflationContext = inflationContext

    const inflationRate = inflationContext[startingYear].inflation

    const indexationRate = definedBenefitsAu.useInflationRate
      ? definedBenefitsAu.indexationRate || inflationRate
      : inflationRate

    const previousYearsIncome = incomeAmount / (1 + indexationRate)

    this.history.push({ value: 0, year: startingYear, income: previousYearsIncome, transferAmt: 0 })
  }

  calcNextYear = (yearData: YearData): YearData => {
    const { year } = yearData

    let newIncome

    if (
      !this.incomeAmount ||
      (this.incomeEndYear && this.incomeEndYear < year) ||
      (this.incomeStartYear && this.incomeStartYear > year)
    ) {
      newIncome = 0
    } else {
      const rateVarianceFactor = this.rateVariation ? this.rateVariation + 1 : 1

      const adjustmentFactor = this.inflationContext[year - 1]
        ? this.inflationContext[year - 1].factor * rateVarianceFactor
        : 1
      const roundedFactor = Math.round(adjustmentFactor * 100) / 100

      newIncome = this.incomeAmount * roundedFactor
    }

    const nextYearData = { year: year + 1, value: 0, income: Math.round(newIncome) }

    this.history.push(nextYearData)
    return nextYearData // TODO: do we need to return this?
  }

  getAssetClass = () => {
    return AssetGroup.other
  }
}
