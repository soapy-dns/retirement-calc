import { IAsset, InflationRecord, LivingExpensesRecord } from ".."

export const validateLivingExpensesVsInflation = (
  livingExpenses: LivingExpensesRecord[],
  inflation: InflationRecord[]
) => {
  // TODO: sort - just getting the 1st for simplicity
  return livingExpenses[0].fromYear >= inflation[0].fromYear
}

export const validateEarningsBucket = (assets: IAsset[]) => {
  const earningsBucketAssets = assets.filter((it) => it.incomeBucket === true)

  return earningsBucketAssets.length === 1
}
