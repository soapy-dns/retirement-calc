import { z } from "zod"

import { IsFormNumberOpt, IsValidYear, YesNoSchema } from "@/app/lib/data/schema/config/schemaUtils"
import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"
import { IScenario } from "@/app/lib/data/schema/config"
import { testForMultipleMigrateAll } from "./validation"

export const getFormSchema = (scenario: IScenario) => {
  const { transfers } = scenario

  const refinedFormSchema = FormSchema.refine(
    (formData) => {
      return testForMultipleMigrateAll(formData, transfers)
    },

    {
      message: `There is already a total transfer from this asset.`,
      path: ["migrateAll"]
    }
  )

  return refinedFormSchema
}

export const FormSchema = z
  .object({
    year: IsValidYear,
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
  .refine(
    ({ year }) => {
      const currentYear = getCurrentYear()

      if (year < currentYear) return false
      return true
    },
    { message: "Transfer year is in the past.", path: ["year"] }
  )

export type FormDataType = z.infer<typeof FormSchema>
