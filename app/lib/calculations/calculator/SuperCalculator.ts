import { AssetConfig, YearData } from "../assets/types"
import { Transfer, SuperContext } from "@/app/lib/data/schema/config"
import { Calculator } from "./Calculator"
import { filterTransfersForYear } from "../transfers/transferUtils"
// import { filterTransfersForYear } from "calculations/transfers/transferUtils"

const getFullTransfers = (transfers: Transfer[]) => {
  return 0
}
/**
 * For super tax gets taken off at source so is not included in income tax
 */
export class SuperCalculator extends Calculator {
  protected config: SuperContext

  constructor(config: SuperContext, assetConfig: AssetConfig, transfers: Transfer[] = []) {
    super(assetConfig, transfers)
    this.config = config
  }

  // call this for each year
  calculate = (yearData: YearData): YearData => {
    const { value: prevValue, year } = yearData

    const transfersForYear = this.transfers ? filterTransfersForYear(this.transfers, year) : []

    const partialTransfersAmt = this.getPartialTransfers(transfersForYear)

    const fullTransfersAmt = getFullTransfers(transfersForYear)

    const transferAmt = partialTransfersAmt + fullTransfersAmt

    const income = (prevValue + transferAmt / 2) * this.config.investmentReturn

    const taxOnIncome = income * this.config.taxationRate

    const value = prevValue + income + transferAmt - taxOnIncome

    return {
      year: year + 1,
      transferAmt,
      value: Math.round(value),
      income: Math.round(income) //TODO: for fixed benefit test
    }
  }
}
