import { Asset } from "../assets/Asset"
import { AssetConfig, YearData } from "../assets/types"
import { PropertyContext } from "../../data/types"
import { Transfer } from "../transfers/types"
import { Calculator } from "./Calculator"
import { InflationContext } from "../types"
import { filterTransfersForYear } from "../transfers/transferUtils"

export class PropertyCalculator extends Calculator {
  protected config: PropertyContext
  protected assetConfig: AssetConfig
  protected inflationContext: InflationContext

  constructor(
    config: PropertyContext,
    assetConfig: AssetConfig,
    transfers: Transfer[] = [],
    inflationContext: InflationContext
  ) {
    super(assetConfig, transfers)
    this.config = config
    this.assetConfig = assetConfig
    this.inflationContext = inflationContext
  }

  // call this for each year
  // lets us pass in value we need - e.g. could be total income earned across all assets
  // transfers would be mortgage payments / drawdown on mortgage
  calculate = (yearData: YearData, assets: Asset[]): YearData => {
    const { value: prevValue, year } = yearData
    const { growthInterestRate } = this.config
    const transfersForYear = this.transfers ? filterTransfersForYear(this.transfers, year) : []

    const partialTransfersAmt = this.getPartialTransfers(transfersForYear)
    const fullTransfersAmt = this.getFullTransfers(yearData, transfersForYear, assets)
    const transferAmt = partialTransfersAmt + fullTransfersAmt

    const inflationFactor = this.inflationContext[year].factor

    const { rentalIncomePerMonth = 0, rentalExpensesPerMonth = 0 } = this.assetConfig

    let rentalIncome = 0
    rentalIncome =
      rentalIncomePerMonth > 0 || rentalExpensesPerMonth > 0
        ? (rentalIncomePerMonth - rentalExpensesPerMonth) * 12 * inflationFactor
        : 0 // TODO: income tax

    const growth = (prevValue + transferAmt) * growthInterestRate

    const value = prevValue + growth + transferAmt

    return {
      year: year + 1,
      growth: Math.round(growth),
      income: Math.round(rentalIncome),
      value: Math.round(value), // this will be gross
      transferAmt
    }
  }
}
