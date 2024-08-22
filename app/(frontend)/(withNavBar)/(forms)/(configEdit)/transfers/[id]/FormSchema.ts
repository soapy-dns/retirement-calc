import { z } from "zod"

import { IsFormNumberOpt, IsValidYear, YesNoSchema } from "@/app/lib/data/schema/config/schemaUtils"
import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"
import { IScenario } from "@/app/lib/data/schema/config"
import { testForMultipleMigrateAllFrom, testForMultipleMigrateAllFromAndTo } from "./validation"

export const getFormSchema = (scenario: IScenario, id: string) => {
  console.log("--getFormSchema id--", id)
  const { transfers } = scenario

  const otherTransfers = transfers?.filter((it) => it.id !== id)

  const refinedFormSchema = FormSchema.refine(
    (formData) => {
      return testForMultipleMigrateAllFrom(formData, otherTransfers)
    },

    {
      message: `There is already a total transfer from this asset.`,
      path: ["from"]
    }
  ).refine(
    (formData) => {
      return testForMultipleMigrateAllFromAndTo(formData, otherTransfers)
    },

    {
      message: `There is already a total transfer from this asset.`,
      path: ["to"]
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
