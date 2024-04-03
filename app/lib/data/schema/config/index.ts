import { z } from "zod"

import { validateEarningsBucket, validateLivingExpensesVsInflation } from "./validation"
import { AssetSchema } from "./asset"
import { CountryEnum, IsFutureOrCurrentYear, YesNoSchema } from "./schemaUtils"
import { currencyFormatter } from "@/app/ui/utils/formatter"

const cashContextSchema = z.object({
  interestRate: z.number()
})

const definedBenefitsContextSchema = z.object({
  useInflationRate: z.boolean(),
  indexationRate: z.number().optional() // should be required if useInflationRate === true
})

const propertyContextSchema = z.object({
  growthInterestRate: z.number()
})

const sharesContextSchema = z.object({
  growthInterestRate: z.number(),
  dividendInterestRate: z.number()
})

const superContextSchema = z.object({
  investmentReturn: z.number(), // net of fees but not taxation
  taxationRate: z.number()
})

export const InflationSchema = z.object({
  fromYear: IsFutureOrCurrentYear,
  inflationRate: z.coerce.number()
})

export const LivingExpensesSchema = z.object({
  fromYear: IsFutureOrCurrentYear,
  amountInTodaysTerms: z.coerce.number().nonnegative()
})

const transferBaseSchema = z.object({
  id: z.string(),
  year: IsFutureOrCurrentYear,
  from: z.string(),
  to: z.string(),
  migrateAll: z.boolean(),
  costOfTransfer: z.number().optional()
})

const transferWithMigrateAll = transferBaseSchema.extend({
  migrateAll: z.literal<boolean>(true),
  value: z.undefined()
})

const transferWithoutMigrateAll = transferBaseSchema.extend({
  migrateAll: z.literal<boolean>(false),
  value: z.number()
})

const transferSchema = z.discriminatedUnion("migrateAll", [transferWithMigrateAll, transferWithoutMigrateAll]).refine(
  ({ costOfTransfer = 0, value, migrateAll }) => {
    if (migrateAll) return true
    return value && costOfTransfer <= value
  },
  ({ costOfTransfer = 0, value }) => ({
    message: `Cost of transfer (${currencyFormatter.format(
      costOfTransfer
    )}) cannot be more than the value to transfer (${currencyFormatter.format(value || 0)})`
  })
)

const contextSchema = z
  .object({
    taxResident: CountryEnum,
    au2ukExchangeRate: z.number().optional(),
    currency: CountryEnum,
    numOfYears: z.number().optional(),
    owners: z.string().array().nonempty(),
    auBank: cashContextSchema,
    definedBenefitsAu: definedBenefitsContextSchema,
    property: propertyContextSchema,
    sharesAu: sharesContextSchema,
    superAu: superContextSchema,
    inflation: z.array(InflationSchema),
    livingExpenses: z.array(LivingExpensesSchema)
  })
  .refine(
    ({ livingExpenses, inflation }) => validateLivingExpensesVsInflation(livingExpenses, inflation),
    ({ livingExpenses }) => {
      return {
        message: `Living expenses for ${livingExpenses[0].fromYear} has no matching inflation rate.`
      }
    }
  )

export const ScenarioSchema = z
  .object({
    id: z.string(),
    test: z.string().optional(),
    name: z.string(),
    description: z.string().optional(),
    assets: z.array(AssetSchema),
    context: contextSchema,
    transfers: z.array(transferSchema).optional()
  })
  .refine(({ assets }) => validateEarningsBucket(assets), {
    message: "Please mark 1 and only 1 asset for accumulating any earnings."
  })

export type IScenario = z.infer<typeof ScenarioSchema>
export type ContextConfig = z.infer<typeof contextSchema>
export type LivingExpensesRecord = z.infer<typeof LivingExpensesSchema>
export type InflationRecord = z.infer<typeof InflationSchema>
export type CashContext = z.infer<typeof cashContextSchema>
export type DefinedBenefitsContext = z.infer<typeof definedBenefitsContextSchema>
export type PropertyContext = z.infer<typeof propertyContextSchema>
export type SharesContext = z.infer<typeof sharesContextSchema>
export type SuperContext = z.infer<typeof superContextSchema>

export * from "./asset"

// export type IAsset = z.infer<typeof AssetSchema> // move IAsset to AssetType TODO:
export type AssetType = z.infer<typeof AssetSchema> // duplicate

export type Transfer = z.infer<typeof transferSchema>
export type Country = z.infer<typeof CountryEnum>
export type YesNoType = z.infer<typeof YesNoSchema>
