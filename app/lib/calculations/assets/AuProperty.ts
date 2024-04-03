import { Asset } from "./Asset"
import { AssetGroup, InflationContext } from "@/app/lib/calculations/types"

import { YearData } from "./types"
import { getPercDrawdownTaxable, getPercIncomeTaxable } from "../tax/utils"
import { IAsset, IScenario, PropertyContext, Transfer } from "../../data/schema/config"
import { getTransferAmt } from "../transfers/getTransfers"

export class AuProperty extends Asset {
  capitalAsset: boolean // if all assets have this, shouldn't it be in the Asset class
  assetGroup: AssetGroup
  percOfEarningsTaxable: number
  percOfDrawdownTaxable: number
  transfers?: Transfer[]
  propertyContext: PropertyContext
  inflationContext: InflationContext
  // TODO: should I not have an 'isRented' flag here?
  rentalStartYear?: number
  rentalEndYear?: number
  rentalIncomePerMonth: number
  rentalExpensesPerMonth: number

  constructor(assetConfig: IAsset, startingYear: number, scenario: IScenario, inflationContext: InflationContext) {
    if (assetConfig.className !== "AuProperty") throw new Error("Invalid config for Property")

    super({ ...assetConfig, incomeProducing: assetConfig?.property?.isRented || false })

    const { value, property: assetProperty } = assetConfig

    const {
      context: { taxResident, property },
      transfers
    } = scenario
    const { rentalExpensesPerMonth, rentalIncomePerMonth, rentalStartYear, rentalEndYear } = assetProperty || {}

    this.propertyContext = property
    this.transfers = transfers // TODO: there has to be a better way!

    this.capitalAsset = true
    this.assetGroup = AssetGroup.property
    this.percOfEarningsTaxable = getPercIncomeTaxable(taxResident, assetConfig.country, this.assetGroup)
    this.percOfDrawdownTaxable = getPercDrawdownTaxable(taxResident, assetConfig.country, this.assetGroup)
    this.inflationContext = inflationContext

    this.rentalStartYear = rentalStartYear
    this.rentalEndYear = rentalEndYear
    this.rentalIncomePerMonth = rentalIncomePerMonth || 0
    this.rentalExpensesPerMonth = rentalExpensesPerMonth || 0

    this.history.push({ value, year: startingYear, transferAmt: 0, income: 0 })
  }

  private shouldHaveRent = (currentYear: number) => {
    const startYear = this.rentalStartYear || 0
    const endYear = this.rentalEndYear || 0
    if (currentYear >= startYear && currentYear < endYear) return true
    return false
  }

  // assets passed in so can calculate full transfers
  calcNextYear = (yearData: YearData, assets: Asset[]): YearData => {
    const { value: prevValue, year } = yearData
    const investmentReturn = this.rateVariation
      ? this.propertyContext.growthInterestRate + this.rateVariation
      : this.propertyContext.growthInterestRate

    const transferAmt = getTransferAmt(this.id, yearData, this.transfers, assets)

    const inflationFactor = this.inflationContext[year].factor

    let rentalIncome = 0
    if (this.shouldHaveRent(year)) {
      rentalIncome =
        this.rentalIncomePerMonth > 0 || this.rentalExpensesPerMonth > 0
          ? (this.rentalIncomePerMonth - this.rentalExpensesPerMonth) * 12 * inflationFactor
          : 0 // TODO: income tax
    }

    const growth = (prevValue + transferAmt) * investmentReturn

    const value = prevValue + growth + transferAmt

    const nextYearData = {
      year: year + 1,
      growth: Math.round(growth),
      income: Math.round(rentalIncome),
      value: Math.round(value), // this will be gross
      transferAmt
    }

    this.history.push(nextYearData)
    return nextYearData // TODO: do we need to return this?
  }

  getAssetClass = () => {
    return AssetGroup.property
  }
}
