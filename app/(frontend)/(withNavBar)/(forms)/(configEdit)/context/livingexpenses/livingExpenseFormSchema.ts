import { z } from "zod"
import { IScenario, LivingExpensesSchema } from "@/app/lib/data/schema/config"
import { sortByFromDate } from "@/app/lib/calculations/utils/sortObjectsByFromDate"

const FormSchema = z.object({
  items: z.array(LivingExpensesSchema)
})

/*
Get living expenses form schema, refinements to compare against the schema
*/
export const getLivingExpensesFormSchema = (scenario: IScenario) => {
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
  ).superRefine(({ items }, ctx) => {
    sortByFromDate(items)

    const duplicateIndex = items.findIndex((item, index) => {
      if (index === 0) return false
      return item.fromYear === items[index - 1].fromYear
    })

    if (duplicateIndex !== -1) {
      ctx.addIssue({
        code: "custom",
        message: "This row has the same year as the previous row.",
        path: ["items", duplicateIndex, "fromYear"]
      })
    }
  })

  return refinedFormSchema
}

export type FormInputDataType = z.input<typeof FormSchema>
export type FormOutputDataType = z.output<typeof FormSchema>
