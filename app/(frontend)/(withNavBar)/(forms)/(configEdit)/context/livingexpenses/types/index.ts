import { z } from "zod"
import { IScenario, LivingExpensesSchema } from "@/app/lib/data/schema/config"
import { sortByFromDate } from "../utils"

const FormSchema = z.object({
  items: z.array(LivingExpensesSchema)
})

export const getFormSchema = (scenario: IScenario) => {
  const { asAtYear } = scenario
  const refinedFormSchema = FormSchema.refine(
    ({ items }) => {
      sortByFromDate(items)
      return items[0].fromYear === asAtYear
    },
    {
      message: `The first row should have a year matching the scenario's 'As at year' - ${asAtYear}`,
      path: ["items", 0, "fromYear"]
    }
  ).refine(
    ({ items }) => {
      sortByFromDate(items)

      // check for duplicates
      const set = new Set(items.map((it) => it.fromYear))
      return set.size === items.length
    },
    ({ items }) => {
      const duplicateIndex = items.findIndex((item, index) => {
        if (index === 0) return false
        if (item.fromYear === items[index - 1].fromYear) return true
        return false
      })
      return {
        message: `This row has the same year as the previous row.`,
        path: ["items", duplicateIndex, "fromYear"]
      }
    }
  )

  return refinedFormSchema
}

export type FormDataType = z.infer<typeof FormSchema>
