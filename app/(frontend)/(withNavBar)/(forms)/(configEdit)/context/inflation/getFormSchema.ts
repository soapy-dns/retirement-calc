import { z } from "zod"
import { IScenario, InflationSchema } from "@/app/lib/data/schema/config"
import { sortByFromDate } from "@/app/lib/calculations/utils/sortObjectsByFromDate"

const InflationFormSchema = z.object({
  items: z.array(InflationSchema)
})

export const getFormSchema = (scenario: IScenario) => {
  const { asAtYear } = scenario
  const refinedInflationFormSchema = InflationFormSchema
    // .refine(
    //   ({ items }) => {
    //     const unsortedItems = [...items]

    //     const errorWithYear = unsortedItems.some((item, index) => {
    //       if (index === 0) return false
    //       if (item.fromYear < unsortedItems[index - 1].fromYear) return true
    //       return false
    //     })

    //     return !errorWithYear
    //   },
    // ({ items }) => {
    //   const unsortedItems = [...items]

    //   const errorIndex = unsortedItems.findIndex((item, index) => {
    //     if (index === 0) return false
    //     if (item.fromYear < unsortedItems[index - 1].fromYear) return true
    //     return false
    //   })
    //   return {
    //     message: `This row has a 'fromYear' less than the previous row.`,
    //     path: ["items", errorIndex, "fromYear"]
    //   }
    // }
    // )

    .refine(
      ({ items }) => {
        // TODO: should copy before sorting!!!
        sortByFromDate(items)
        return items[0].fromYear === asAtYear
      },
      {
        message: `The first row should have a year matching the scenario's 'As at year' - ${asAtYear}`,
        path: ["items", 0, "fromYear"]
      }
    )
    .superRefine((data, ctx) => {
      const sortedItems = [...data.items].sort((a, b) => a.fromYear - b.fromYear)

      const duplicate = sortedItems.find((item, index) => {
        return index > 0 && item.fromYear === sortedItems[index - 1].fromYear
      })

      if (!duplicate) return

      const duplicateIndex = data.items.findIndex((item) => item === duplicate)

      ctx.addIssue({
        code: "custom",
        message: "This row has the same year as the previous row.",
        path: ["items", duplicateIndex, "fromYear"]
      })
    })

  return refinedInflationFormSchema
}

export type FormInputDataType = z.input<typeof InflationFormSchema>
export type FormOutputDataType = z.output<typeof InflationFormSchema>
