import { Asset } from "../assets/Asset"
import { AssetConfig, YearData } from "../assets/types"
import { CashContext } from "../../data/schema/config"
import { Transfer } from "@/app/lib/data/schema/config"
import { Calculator } from "./Calculator"
import { filterTransfersForYear } from "../transfers/transferUtils"
// import { filterTransfersForYear } from "calculations/transfers/transferUtils"

export class CashCalculator extends Calculator {
  protected config: CashContext

  constructor(config: CashContext, assetConfig: AssetConfig, transfers?: Transfer[]) {
    super(assetConfig, transfers)
    this.config = config
  }

  calculate = (yearData: YearData, assets: Asset[]): YearData => {
    const { value: prevValue, year } = yearData

    const transfersForYear = this.transfers ? filterTransfersForYear(this.transfers, year) : []

    const partialTransfersAmt = this.getPartialTransfers(transfersForYear)

    const fullTransfersAmt = this.getFullTransfers(yearData, transfersForYear, assets)

    const transferAmt = partialTransfersAmt + fullTransfersAmt

    const income = (prevValue + transferAmt / 2) * this.config.interestRate

    const value = prevValue + transferAmt // note does not add income just yet
    const incomeCalc = `(${prevValue} + ${transferAmt}/2) * ${this.config.interestRate}`

    return {
      year: year + 1,
      income: Math.round(income),
      value: Math.round(value), // this will be gross
      transferAmt,
      // partialTransfersAmt: Math.round(partialTransfersAmt),
      incomeCalc
    }
  }
}
