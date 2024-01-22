import { currencyFormatter } from "@/app/ui/utils/formatter"
import { z } from "zod"
import { getStartingYear } from "../../../calculations/utils/getStartingYear"
import { validateEarningsBucket, validateLivingExpensesVsInflation, yearNotPassed } from "./validation"

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
  // TODO: put this directly against fromYear
  .refine(({ fromYear }) => fromYear >= getStartingYear(), {
    message: "From year cannot be in the past."
  })

const transferBaseSchema = z.object({
  id: z.string(),
  year: z.number().refine(
    (val) => yearNotPassed(val),
    (val) => {
      return {
        message: `Transfer year ${val} is in the past`
      }
    }
  ),
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
    return !migrateAll && value && costOfTransfer <= value
  },
  ({ costOfTransfer = 0, value }) => ({
    message: `Cost of transfer (${currencyFormatter.format(
      costOfTransfer
    )}) cannot be more than the value to transfer (${currencyFormatter.format(value || 0)})`
  })
)

const assetSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
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

export const scenarioSchema = z
  .object({
    id: z.string(),
    test: z.string().optional(),
    name: z.string(),
    description: z.string().optional(),
    assets: z.array(assetSchema),
    context: contextSchema,
    transfers: z.array(transferSchema).optional()
  })
  .refine(({ assets }) => validateEarningsBucket(assets), {
    message: "1 and only 1 asset should be marked as an 'earnings bucket'"
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
