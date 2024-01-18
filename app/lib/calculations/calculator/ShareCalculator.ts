import { Asset } from "../assets/Asset"
import { AssetConfig, YearData } from "../assets/types"
import { SharesContext } from "../../data/schema"
import { Transfer } from "@/app/lib/data/schema"
import { Calculator } from "./Calculator"
import { filterTransfersForYear } from "../transfers/transferUtils"
// import { filterTransfersForYear } from "calculations/transfers/transferUtils"

export class ShareCalculator extends Calculator {
  protected config: SharesContext

  constructor(config: SharesContext, assetConfig: AssetConfig, transfers: Transfer[] = []) {
    super(assetConfig, transfers)
    this.config = config
  }

  // call this for each year
  // lets us pass in value we need - e.g. could be total income earned across all assets
  calculate = (yearData: YearData, assets: Asset[]): YearData => {
    const { value: prevValue, year } = yearData

    const transfersForYear = this.transfers ? filterTransfersForYear(this.transfers, year) : []

    const partialTransfersAmt = this.getPartialTransfers(transfersForYear)

    const fullTransfersAmt = this.getFullTransfers(yearData, transfersForYear, assets)

    const transferAmt = partialTransfersAmt + fullTransfersAmt

    const dividendIncome = (prevValue + transferAmt / 2) * this.config.dividendInterestRate

    const growth = (prevValue + transferAmt / 2) * this.config.growthInterestRate

    const value = prevValue + growth + transferAmt

    return {
      // transferAmt: Math.round(transferAmt, 0),
      transferAmt,
      year: year + 1,
      growth: Math.round(growth),
      // taxableAmount: Math.round(dividendIncome, 0),
      income: Math.round(dividendIncome),
      value: Math.round(value) // this will be gross
    }
  }
}
