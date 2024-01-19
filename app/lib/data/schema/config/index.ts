import { z } from "zod"
import { getStartingYear } from "../../../calculations/utils/getStartingYear"
import { validateLivingExpensesVsInflation } from "./validation"

const countryEnum = z.enum(["AU", "SC"])

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

const inflationSchema = z
  .object({
    fromYear: z.number(),
    inflationRate: z.number()
  })
  .refine(({ fromYear }) => fromYear >= getStartingYear(), {
    message: "From year cannot be in the past."
  })

const livingExpensesSchema = z
  .object({
    fromYear: z.number(),
    amountInTodaysTerms: z.number()
  })
  .refine(({ fromYear }) => fromYear >= getStartingYear(), {
    message: "From year cannot be in the past."
  })

const transferBaseSchema = z.object({
  id: z.string(),
  year: z.number(),
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

const transferSchema = z.discriminatedUnion("migrateAll", [transferWithMigrateAll, transferWithoutMigrateAll])

const assetSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  value: z.number(), // can we make this optional?
  income: z.number().optional(), // value and income should be mutually exclusive
  assetOwners: z.array(z.string()),
  className: z.string(),
  incomeBucket: z.boolean().optional(),
  canDrawdown: z.boolean().optional(),
  drawdownFrom: z.number().optional(),
  drawdownOrder: z.number().optional(),
  preferredMinAmt: z.number().optional(),
  isRented: z.boolean().optional(),
  rentalIncomePerMonth: z.number().optional(),
  rentalExpensesPerMonth: z.number().optional(),
  incomeStartYear: z.number().optional(),
  incomeEndYear: z.number().optional(),
  country: countryEnum.optional() // defaults to AU
})

const contextSchema = z
  .object({
    taxResident: countryEnum,
    au2ukExchangeRate: z.number().optional(),
    currency: countryEnum,
    numOfYears: z.number().optional(),
    owners: z.array(z.string()),
    auBank: cashContextSchema,
    definedBenefitsAu: definedBenefitsContextSchema,
    property: propertyContextSchema,
    sharesAu: sharesContextSchema,
    superAu: superContextSchema,
    inflation: z.array(inflationSchema),
    livingExpenses: z.array(livingExpensesSchema)
  })
  .refine(
    ({ livingExpenses, inflation }) => validateLivingExpensesVsInflation(livingExpenses, inflation),
    ({ livingExpenses }) => {
      return {
        message: `Living expenses for ${livingExpenses[0].fromYear} has no matching inflation rate.`
      }
    }
  )

export const scenarioSchema = z.object({
  id: z.string(),
  test: z.string().optional(),
  name: z.string(),
  description: z.string(),
  assets: z.array(assetSchema),
  context: contextSchema,
  transfers: z.array(transferSchema).optional()
})

export type IScenario = z.infer<typeof scenarioSchema>
export type ContextConfig = z.infer<typeof contextSchema>
export type LivingExpensesRecord = z.infer<typeof livingExpensesSchema>
export type InflationRecord = z.infer<typeof inflationSchema>
export type CashContext = z.infer<typeof cashContextSchema>
export type DefinedBenefitsContext = z.infer<typeof definedBenefitsContextSchema>
export type PropertyContext = z.infer<typeof propertyContextSchema>
export type SharesContext = z.infer<typeof sharesContextSchema>
export type SuperContext = z.infer<typeof superContextSchema>

export type IAsset = z.infer<typeof assetSchema>
export type Transfer = z.infer<typeof transferSchema>
export type Country = z.infer<typeof countryEnum>
