import { z } from "zod"
import { getStartingYear } from "@/app/lib/calculations/utils/getStartingYear"
import { InflationRecord, InflationSchema } from "@/app/lib/data/schema/config"

const sortByFromDate = (inflationRows: InflationRecord[]): InflationRecord[] => {
  return inflationRows.sort((a, b) => {
    if (a.fromYear > b.fromYear) return 1
    if (a.fromYear < b.fromYear) return -1
    return 0
  })
}

export const FormSchema = z
  .object({
    items: z.array(InflationSchema)
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
