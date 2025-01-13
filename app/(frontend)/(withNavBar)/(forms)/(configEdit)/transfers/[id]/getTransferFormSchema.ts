import { z } from "zod"

import { IsFormNumberOpt, YesNoSchema } from "@/app/lib/data/schema/config/schemaUtils"
import { IScenario } from "@/app/lib/data/schema/config"
import { testForMultipleMigrateAllFrom, testForMultipleMigrateAllFromAndTo } from "./validation"

export const getTransferFormSchema = (scenario: IScenario, id: string) => {
  const { transfers } = scenario

  const otherTransfers = transfers?.filter((it) => it.id !== id)

  const refinedTransferFormSchema = BasicTransferFormSchema.refine(
    (formData) => {
      return testForMultipleMigrateAllFrom(formData, otherTransfers)
    },

    {
      message: `There is already a total transfer from this asset.`,
      path: ["from"]
    }
  )
    .refine(
      (formData) => {
        return testForMultipleMigrateAllFromAndTo(formData, otherTransfers)
      },

      {
        message: `There is already a total transfer from this asset.`,
        path: ["to"]
      }
    )
    .refine(
      ({ year }) => {
        console.log("comparing year-->>>", year, "against asAtYear", scenario.asAtYear)
        if (year < scenario.asAtYear) return false
      },
      {
        message: `There year must be >= the scenario's asAtYear of ${scenario.asAtYear}`,
        path: ["from"]
      }
    )

  return refinedTransferFormSchema
}

export const BasicTransferFormSchema = z
  .object({
    // year: IsValidYear,
    year: z.coerce.number(),
    from: z.string(),
    to: z.string(),
    migrateAll: YesNoSchema.optional(),
    value: IsFormNumberOpt,
    costOfTransfer: IsFormNumberOpt
  })
  .refine(
    ({ from, to }) => {
      if (from === to) return false
      return true
    },
    { message: "The 'From' asset is the same as the 'To' asset.", path: ["from"] }
  )
// .refine(
//   ({ year }) => {
//     const currentYear = getCurrentYear()

//     if (year < currentYear) return false
//     return true
//   },
//   { message: "Transfer year is in the past.", path: ["year"] }
// )

export type FormDataType = z.infer<typeof BasicTransferFormSchema>
