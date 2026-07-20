import { z } from "zod"

import { assetsVsOwners, validateIncomeBucket } from "./validation"
import { AssetSchema } from "./asset"
import { CountryEnum, IsFormNumber, YesNoSchema } from "./schemaUtils"

import { sortByFromDate } from "@/app/lib/calculations/utils/sortObjectsByFromDate"

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

const OwnerSchema = z.object({
  identifier: z.string(),
  ownerName: z.string(),
  birthYear: z.number(),
  gender: z.enum(["M", "F"])
})

const OwnersSchema = z.array(OwnerSchema).min(1).max(2)

export type OwnerType = z.infer<typeof OwnerSchema>

export type OwnersType = z.infer<typeof OwnersSchema>

const sharesContextSchema = z.object({
  growthInterestRate: z.number(),
  dividendInterestRate: z.number()
})

const superContextSchema = z.object({
  investmentReturn: z.number() // net of fees but not taxation
  // taxationRate: z.number()
})

// will need to refine, but since this will require cross field validation, it will be done versus to scenario
export const InflationSchema = z.object({
  // fromYear: isValidYearBetween(),
  fromYear: IsFormNumber,
  // fromYear: IsValidYear,
  inflationRate: IsFormNumber
})

// will need to refine, but since this will require cross field validation, it will be done versus to scenario
export const LivingExpensesSchema = z
  .object({
    // fromYear: isValidYearBetween(),
    fromYear: IsFormNumber,
    amountInTodaysTerms: IsFormNumber
  })
  .refine(
    ({ amountInTodaysTerms }) => {
      return amountInTodaysTerms >= 0
    },
    { message: "The value at today's date must be >= 0.", path: ["amountInTodaysTerms"] }
  )

const BasicTransferSchema = z.object({
  year: z.coerce.number(),
  from: z.string(),
  to: z.string(),
  transferPercent: IsFormNumber,
  transferCostType: z.enum(["NO_COST", "TODAYS_MONEY", "PERCENTAGE", "FUTURE_MONEY"]),
  transferCostValue: z.coerce.number().optional()
})

export const TransferSchema = BasicTransferSchema

export const TransferWithIdSchema = TransferSchema.extend({ id: z.string() }).refine(
  ({ transferPercent }) => {
    return transferPercent > 0 && transferPercent <= 100
  },
  { message: "The transfer percent must be > 0 and <=100.", path: ["transferPercent"] }
)

// TODO: rinstate this
// export const TransferSchema = BasicTransferSchema.refine(
//   ({ transferPercent }) => {
//     if (transferPercent > 0 && transferPercent <= 100) return true
//     return false
//   },
//   { message: "Transfer percent must be between 0 and 100", path: ["transferPercent"] } // TODO: different path for
// )

const ContextSchema = z.object({
  taxResident: CountryEnum,
  au2ukExchangeRate: z.number().optional(),
  currency: CountryEnum,
  numOfYears: z.number().optional(),
  // owners: z.string().array().nonempty(),
  owners: OwnersSchema,
  auBank: cashContextSchema,
  definedBenefitsAu: definedBenefitsContextSchema,
  property: propertyContextSchema,
  sharesAu: sharesContextSchema,
  superAu: superContextSchema,
  inflation: z.array(InflationSchema),
  livingExpenses: z.array(LivingExpensesSchema)
})

// .refine(
//   ({ livingExpenses, inflation }) => validateLivingExpensesVsInflation(livingExpenses, inflation),
//   ({ livingExpenses }) => {
//     return {
//       message: `Living expenses for ${livingExpenses[0].fromYear} has no matching inflation rate.`
//     }
//   }
// // )
// const stressTestValues = stressTestOptions.map((it) => {
//   return it.value
// }) as [string, ...string[]] // needs to have one value - weird zod shit
// // export const CountryEnum = z.enum(["AU", "SC", "EN", "WA", "NI"])

// export const StressTestSchema = z.enum([...stressTestValues]).optional()

// I tried to get this from stressTestOptions, but it didn't work well.  Maybe readOnly?
// export const StressTestEnum = z.enum(["NONE", "LOWER_RETURNS", "MARKET_CRASH", "CARE_REQUIRED", "EXCHANGE_RATE"])
export const StressTestEnum = z.enum(["NONE", "LOWER_RETURNS", "MARKET_CRASH", "PROPERTY_CRASH"])

export const ScenarioSchema = z
  .object({
    id: z.string(),
    test: z.string().optional(),
    name: z.string(),
    description: z.string().optional(),
    asAtYear: z.number(),
    stressTest: StressTestEnum,
    assets: z.array(AssetSchema),
    context: ContextSchema,
    transfers: z.array(TransferWithIdSchema).optional()
  })
  .refine(({ assets }) => validateIncomeBucket(assets), {
    message: "Please mark 1 and only 1 asset for accumulating any income."
  })
  .refine(({ assets, context }) => assetsVsOwners(assets, context), {
    message: "An asset has no owners."
  })
  .superRefine(({ asAtYear, context: { livingExpenses } }, ctx) => {
    // Note: sorting mutates the array in-place
    sortByFromDate(livingExpenses)

    if (livingExpenses[0]?.fromYear !== asAtYear) {
      ctx.addIssue({
        code: "custom",
        message: `The first row should have a year matching the scenario's 'As at year' of ${asAtYear}`,
        path: ["context", "livingExpenses", 0, "fromYear"]
      })
    }
  })
  .superRefine(({ context: { livingExpenses } }, ctx) => {
    sortByFromDate(livingExpenses)

    // Track seen years to catch duplicates on the fly
    const seenYears = new Set<number>()

    livingExpenses.forEach((item, index) => {
      if (seenYears.has(item.fromYear)) {
        ctx.addIssue({
          code: "custom",
          message: "This row has the same year as a previous row.",
          path: ["context", "livingExpenses", index, "fromYear"]
        })
      }
      seenYears.add(item.fromYear)
    })
  })
  .superRefine(({ asAtYear, context: { inflation } }, ctx) => {
    // Note: sorting mutates the array in-place
    sortByFromDate(inflation)

    if (inflation?.[0]?.fromYear !== asAtYear) {
      ctx.addIssue({
        code: "custom",
        message: `The first row should have a year matching the scenario's 'As at year' of ${asAtYear}`,
        path: ["context", "inflation", 0, "fromYear"]
      })
    }
  })
  .superRefine(({ context: { inflation } }, ctx) => {
    sortByFromDate(inflation)

    // Track seen years to catch duplicates immediately
    const seenYears = new Set<number>()

    inflation.forEach((item, index) => {
      if (seenYears.has(item.fromYear)) {
        ctx.addIssue({
          code: "custom",
          message: "This row has the same year as a previous row.",
          path: ["context", "inflation", index, "fromYear"]
        })
      }
      seenYears.add(item.fromYear)
    })
  })
  .superRefine(({ asAtYear, transfers }, ctx) => {
    if (!transfers) return

    const invalidIndex = transfers.findIndex((transfer) => transfer.year < asAtYear)

    if (invalidIndex !== -1) {
      ctx.addIssue({
        code: "custom",
        message: `Transfer year must be >= 'As at year' of ${asAtYear}`,
        path: ["transfers", invalidIndex, "year"] // Targets the exact field on the invalid row
      })
    }
  })

export type IScenario = z.infer<typeof ScenarioSchema>
export type ContextConfig = z.infer<typeof ContextSchema>
export type LivingExpensesRecord = z.infer<typeof LivingExpensesSchema>
export type InflationRecord = z.infer<typeof InflationSchema>
export type CashContext = z.infer<typeof cashContextSchema>
export type DefinedBenefitsContext = z.infer<typeof definedBenefitsContextSchema>
export type PropertyContext = z.infer<typeof propertyContextSchema>
export type SharesContext = z.infer<typeof sharesContextSchema>
export type SuperContext = z.infer<typeof superContextSchema>
export type StressTest = z.infer<typeof StressTestEnum>

export * from "./asset"

// export type IAsset = z.infer<typeof AssetSchema> // move IAsset to AssetType TODO:
export type AssetType = z.infer<typeof AssetSchema> // duplicate

export type Transfer = z.infer<typeof TransferWithIdSchema>
export type Country = z.infer<typeof CountryEnum>
export type YesNoType = z.infer<typeof YesNoSchema>
