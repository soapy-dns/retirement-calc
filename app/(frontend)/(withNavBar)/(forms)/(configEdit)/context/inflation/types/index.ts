import { z } from "zod"
import { IScenario, InflationRecord, InflationSchema } from "@/app/lib/data/schema/config"

const sortByFromDate = (inflationRows: InflationRecord[]): InflationRecord[] => {
  return inflationRows.sort((a, b) => {
    if (a.fromYear > b.fromYear) return 1
    if (a.fromYear < b.fromYear) return -1
    return 0
  })
}

const FormSchema = z.object({
  items: z.array(InflationSchema)
})

export const getFormSchema = (scenario: IScenario) => {
  const { asAtYear } = scenario
  const refinedFormSchema = FormSchema
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
        sortByFromDate(items)
        return items[0].fromYear === asAtYear
      },
      {
        message: `The first row should have a year matching the 'As at year' of ${asAtYear}`,
        path: ["items", 0, "fromYear"]
      }
    )
    .refine(
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
