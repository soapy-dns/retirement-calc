import { currencyFormatter } from "@/app/ui/utils/formatter"
import { z } from "zod"
import { getStartingYear } from "../../../calculations/utils/getStartingYear"
import { incomeValidator, validateEarningsBucket, validateLivingExpensesVsInflation, yearNotPassed } from "./validation"

// export const zodInputStringPipe = (zodPipe: z.ZodTypeAny) =>
//   z
//     .string()
//     .transform((value) => (value === "" ? null : value))
//     .nullable()
//     .refine((value) => value === null || !isNaN(Number(value)), {
//       message: "Nombre Invalide"
//     })
//     .transform((value) => (value === null ? 0 : Number(value)))
//     .pipe(zodPipe)

// export const YearConstraint = zodInputStringPipe(
//   z.number().refine(
//     (val) => yearNotPassed(val),
//     (val) => {
//       return {
//         message: `Year ${val} is in the past`
//       }
//     }
//   )
// )
// export const YearConstraint = z // .optional() // .transform((value) => (value === "" ? null : value)) // .string()
//   .string()
//   .transform((value) => (value === "" ? null : value))
//   // .nullable()
//   .refine(
//     (val) => yearNotPassed(val),
//     (val) => {
//       return {
//         message: `Year ${val} is in the past`
//       }
//     }
//   )

export const YearConstraint = z.preprocess(
  (val) => (val === "" ? undefined : val),
  z.coerce
    .number()
    // .optional()
    .refine(
      (val) => val === undefined || yearNotPassed(val),
      (val) => {
        return {
          message: `Year ${val} is in the past`
        }
      }
    )
)
export const CountryEnum = z.enum(["AU", "SC"])
export const YesNoSchema = z.enum(["Y", "N"])
export const AssetTypeEnum = z.enum(["AuBank", "AuSuper", "AuProperty", "Salary", "AuDefinedBenefits", "AuShares"])

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
  .refine(
    ({ fromYear }) => {
      // return true is ok, false is error
      return fromYear >= getStartingYear()
    },
    {
      message: "The 'From year' cannot be in the past."
    }
  )

const livingExpensesSchema = z.object({
  fromYear: YearConstraint,
  amountInTodaysTerms: z.number()
})

const transferBaseSchema = z.object({
  id: z.string(),
  year: YearConstraint,
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

// TODO: only 1 income bucket
const AssetSchema = z
  .object({
    id: z.string(),
    // className: AssetTypeEnum,
    className: z.string(),
    name: z.string(),
    description: z.string().optional(),
    value: z.number(), // TODO: make this optional
    income: z.number().optional(), // value and income should be mutually exclusive
    assetOwners: z.string().array(),
    // assetOwners: z.string().array().nonempty(),
    incomeBucket: z.boolean().optional(),
    canDrawdown: z.boolean().optional(),
    drawdownFrom: YearConstraint.optional(),
    drawdownOrder: z.number().optional(),
    preferredMinAmt: z.number().optional(),
    isRented: z.boolean().optional(),
    rentalIncomePerMonth: z.number().gte(0).optional(),
    rentalExpensesPerMonth: z.number().gte(0).optional(),
    incomeStartYear: YearConstraint.optional(),
    incomeEndYear: YearConstraint.optional(),
    country: CountryEnum.optional() // defaults to AU
  })
  .refine(incomeValidator.validator, incomeValidator.options)
  .refine(
    ({ canDrawdown, drawdownOrder }) => {
      if (canDrawdown && !drawdownOrder) return false
      return true
    },
    {
      message: "A drawdownable asset must have a drawdown order set",
      path: ["canDrawdown"]
    }
  )
  .refine(
    ({ isRented, rentalIncomePerMonth }) => {
      if (isRented && !rentalIncomePerMonth) return false
      return true
    },
    {
      message: "Rented out properties must have a rental income.",
      path: ["isRented"]
    }
  )

// TODO: better typescript

// const CashAssetSchema = AssetBaseSchema.extend({
//   className: z.literal("AuBank"),
//   value: z.number().gte(0)
// })

// const SuperAssetSchema = AssetBaseSchema.extend({
//   className: z.literal("AuSuper"),
//   value: z.number().gte(0)
// })

// const PropertyAssetSchema = AssetBaseSchema.extend({
//   className: z.literal("AuProperty"),
//   value: z.number().gte(0)
// })

// const ShareAssetSchema = AssetBaseSchema.extend({
//   className: z.literal("AuShares"),
//   value: z.number().gte(0)
// })

// const SalaryAssetSchema = AssetBaseSchema.extend({
//   className: z.literal("Salary"),
//   income: z.number().gte(0)
// })
// const DefinedBenefitsAssetSchema = AssetBaseSchema.extend({
//   className: z.literal("AuDefinedBenefits"),
//   income: z.number().gte(0)
// })

// export const AssetSchema = z
//   .discriminatedUnion("className", [
//     CashAssetSchema,
//     SuperAssetSchema,
//     PropertyAssetSchema,
//     ShareAssetSchema,
//     SalaryAssetSchema,
//     DefinedBenefitsAssetSchema
//   ])
//   .refine(incomeValidator.validator, incomeValidator.options)
//   .refine(
//     ({ canDrawdown, drawdownOrder }) => {
//       if (canDrawdown && !drawdownOrder) return false
//       return true
//     },
//     {
//       message: "A drawdownable asset must have a drawdown order set",
//       path: ["canDrawdown"]
//     }
//   )
//   .refine(
//     ({ isRented, rentalIncomePerMonth }) => {
//       if (isRented && !rentalIncomePerMonth) return false
//       return true
//     },
//     {
//       message: "Rented out properties must have a rental income.",
//       path: ["isRented"]
//     }
//   )

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
    assets: z.array(AssetSchema),
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

export type IAsset = z.infer<typeof AssetSchema> // move IAsset to AssetType TODO:
export type AssetType = z.infer<typeof AssetSchema>

export type Transfer = z.infer<typeof transferSchema>
export type Country = z.infer<typeof CountryEnum>
export type YesNoType = z.infer<typeof YesNoSchema>
