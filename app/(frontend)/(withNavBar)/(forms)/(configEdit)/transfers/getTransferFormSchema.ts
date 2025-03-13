import { z } from "@/app/lib/data/schema/config/validation/customZod"

import { IScenario, TransferSchema } from "@/app/lib/data/schema/config"
import { verifyNotTransferringMoreThan100Percent } from "./validation/verifyNotTransferringMoreThan100Percent"

// TODO: make sure the refines work for backend as well as front end
export const getTransferFormSchema = (scenario: IScenario, id: string) => {
  const { transfers } = scenario

  const otherTransfers = transfers?.filter((it) => it.id !== id)

  const refinedTransferFormSchema = TransferSchema.refine(
    ({ from, to }) => {
      return from !== to
    },
    { message: "The 'from' asset must not equal the 'to' asset." }
  )
    .refine(
      (formData) => {
        return verifyNotTransferringMoreThan100Percent(formData, otherTransfers)
      },
      {
        message: `This year, you are trying to transfer > 100% of funds from this asset.`,
        path: ["transferPercent"]
      }
    )
    .refine(
      ({ year }) => {
        return year >= scenario.asAtYear
      },
      {
        message: `The year must be >= the scenario's 'As at year' of ${scenario.asAtYear}`,
        path: ["year"]
      }
    )

  return refinedTransferFormSchema
}

export type TransferFormData = z.infer<typeof TransferSchema>
