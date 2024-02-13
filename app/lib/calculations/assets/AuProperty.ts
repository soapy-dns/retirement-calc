import { Asset } from "./Asset"
import { AssetClass, InflationContext } from "@/app/lib/calculations/types"

import { AssetConfig, YearData } from "./types"
import { getPercDrawdownTaxable, getPercIncomeTaxable } from "../tax/utils"
import { PropertyContext, Transfer } from "../../data/schema/config"
import { getTransferAmt } from "../transfers/getTransfers"

export class AuProperty extends Asset {
  capitalAsset: boolean // if all assets have this, shouldn't it be in the Asset class
  assetClass: AssetClass
  percOfEarningsTaxable: number
  percOfDrawdownTaxable: number
  transfers?: Transfer[]
  propertyContext: PropertyContext
  inflationContext: InflationContext
  rentalIncomePerMonth: number
  rentalExpensesPerMonth: number

  constructor(assetConfig: AssetConfig, inflationContext: InflationContext) {
    super({
      ...assetConfig,
      canDrawdown: false,
      incomeProducing: assetConfig.isRented || false
    })
    const {
      value,
      rentalExpensesPerMonth,
      rentalIncomePerMonth,
      startingYear,
      scenario: {
        context: { taxResident, property },
        transfers
      }
    } = assetConfig

    this.propertyContext = property
    this.transfers = transfers // TODO: there has to be a better way!

    this.capitalAsset = true
    this.assetClass = AssetClass.property
    this.percOfEarningsTaxable = getPercIncomeTaxable(taxResident, assetConfig.country, this.assetClass)
    this.percOfDrawdownTaxable = getPercDrawdownTaxable(taxResident, assetConfig.country, this.assetClass)
    this.inflationContext = inflationContext
    this.rentalIncomePerMonth = rentalIncomePerMonth || 0
    this.rentalExpensesPerMonth = rentalExpensesPerMonth || 0

    this.history.push({ value, year: startingYear, transferAmt: 0, income: 0 })
  }

  // assets passed in so can calculate full transfers
  calcNextYear = (yearData: YearData, assets: Asset[]): YearData => {
    const { value: prevValue, year } = yearData
    const { growthInterestRate } = this.propertyContext

    const transferAmt = getTransferAmt(this.id, yearData, this.transfers, assets)
    // console.log("--year, transferAmt--", year, transferAmt)

    const inflationFactor = this.inflationContext[year].factor

    let rentalIncome = 0
    rentalIncome =
      this.rentalIncomePerMonth > 0 || this.rentalExpensesPerMonth > 0
        ? (this.rentalIncomePerMonth - this.rentalExpensesPerMonth) * 12 * inflationFactor
        : 0 // TODO: income tax

    const growth = (prevValue + transferAmt) * growthInterestRate

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
    return AssetClass.property
  }
}
