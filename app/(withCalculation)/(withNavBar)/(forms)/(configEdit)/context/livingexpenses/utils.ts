import { LivingExpensesRecord } from "@/app/lib/data/schema/config"

export const sortByFromDate = (rows: LivingExpensesRecord[]) => {
  rows.sort((a, b) => {
    if (a.fromYear > b.fromYear) return 1
    if (a.fromYear < b.fromYear) return -1
    return 0
  })

  return rows // rows are actually sorted in place but this helps testing
}
