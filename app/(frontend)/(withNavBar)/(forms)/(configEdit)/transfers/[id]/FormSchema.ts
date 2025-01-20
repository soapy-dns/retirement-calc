import { z } from "zod"

import { IsFormNumberOpt, YesNoSchema } from "@/app/lib/data/schema/config/schemaUtils"
import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"

export const BasicTransferFormSchema = z
  .object({
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
  .refine(
    ({ year }) => {
      const currentYear = getCurrentYear()

      if (year < currentYear) return false
      return true
    },
    { message: "Transfer year is in the past.", path: ["year"] }
  )

export type FormDataType = z.infer<typeof BasicTransferFormSchema>
