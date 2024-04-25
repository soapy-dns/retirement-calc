import { isEarnedIncomeAsset } from "@/app/ui/utils"
import { Asset } from "../assets/Asset"

// Earnings are income from work, not investment income or income from pensions
export const getEarningTaxes = (assets: Asset[]) => {
  const classNames = assets.map((it) => it.className)
  const assetsWithEarnings = assets.filter((it) => isEarnedIncomeAsset(it.className))

  //   const earningsTaxes = assetsWithEarnings.map((it) => {
  //     console.log("--it.name, it.history--", it.name, it.history)
  //   })
  // get earned income
  // if no earned income, return
  // get tax calculator
  // calculate (any subsequent drawdowns doesn't impact earnings)
}
