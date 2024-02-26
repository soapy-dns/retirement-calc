import { z } from "zod"
import { getStartingYear } from "@/app/lib/calculations/utils/getStartingYear"
import { LivingExpensesSchema } from "@/app/lib/data/schema/config"
import { sortByFromDate } from "../utils"

// const sortByFromDate = (rows: LivingExpensesRecord[]): LivingExpensesRecord[] => {
//   return rows.toSorted((a, b) => {
//     if (a.fromYear > b.fromYear) return 1
//     if (a.fromYear < b.fromYear) return -1
//     return 0
//   })
// }

export const FormSchema = z
  .object({
    items: z.array(LivingExpensesSchema)
  })
  .refine(
    ({ items }) => {
      sortByFromDate(items)
      const startYear = getStartingYear()
      return items[0].fromYear <= startYear
    },
    {
      message: `There should be a row from ${getStartingYear()}`,
      path: ["items", 0, "fromYear"]
    }
  )

export type FormDataType = z.infer<typeof FormSchema>
