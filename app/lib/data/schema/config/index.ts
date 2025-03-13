import { z } from "zod"

import { assetsVsOwners, validateIncomeBucket } from "./validation"
import { AssetSchema } from "./asset"
import { CountryEnum, IsFormNumber, YesNoSchema } from "./schemaUtils"
import { numberFormatter } from "@/app/ui/utils/formatter"
import { stressTestOptions } from "../../options"
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
  birthYear: z.number().optional(),
  gender: z.enum(["M", "F"]).optional()
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

// const transferBaseSchema = z.object({
//   id: z.string(),
//   // year: IsValidYear,
//   year: z.coerce.number(),
//   from: z.string(),
//   to: z.string(),
//   // migrateAll: z.boolean(),
//   // costOfTransfer: z.number().optional()
//   transferPercent: z.number(),
//   transferCostType: z.enum(["TODAYS_MONEY", "PERCENTAGE", "FUTURE_MONEY"]),
//   transferCostValue: z.number()
// })

// const transferWithMigrateAll = transferBaseSchema.extend({
//   migrateAll: z.literal<boolean>(true),
//   value: z.undefined()
// })

// const transferWithoutMigrateAll = transferBaseSchema.extend({
//   migrateAll: z.literal<boolean>(false),
//   value: z.number()
// })

// const transferBaseSchema = z.object({
//   id: z.string(),
//   // year: IsValidYear,
//   year: z.coerce.number(),
//   from: z.string(),
//   to: z.string(),
//   migrateAll: z.boolean(),
//   costOfTransfer: z.number().optional()
// })

// const transferWithMigrateAll = transferBaseSchema.extend({
//   migrateAll: z.literal<boolean>(true),
//   value: z.undefined()
// })

// const transferWithoutMigrateAll = transferBaseSchema.extend({
//   migrateAll: z.literal<boolean>(false),
//   value: z.number()
// })

// export const TransferSchema = z.discriminatedUnion("migrateAll", [transferWithMigrateAll, transferWithoutMigrateAll])

// const BasicTransferWithCost =
// const CostTypeEnum = z.enum(["TODAYS_MONEY", "PERCENTAGE", "FUTURE_MONEY"])

const BasicTransferSchema = z.object({
  year: z.coerce.number(),
  from: z.string(),
  to: z.string(),
  transferPercent: z.coerce.number().min(0).max(100),
  transferCostType: z.enum(["NO_COST", "TODAYS_MONEY", "PERCENTAGE", "FUTURE_MONEY"]),
  transferCostValue: z.coerce.number().optional()
})

// const TransferWithoutCost = BasicTransferSchema.extend({
//   transferCostType: z.literal<string>("NO_COST")
//   // transferCostValue: z.coerce.number()
// })
// const TransferWithCost = BasicTransferSchema.extend({
//   transferCostType: CostTypeEnum,
//   // z.string
//   //   z.CostType<CostType>("TODAYS_MONEY") | z.literal<CostType>("PERCENTAGE") | z.literal<CostType>("FUTURE_MONEY"),
//   transferCostValue: z.coerce.number()
// })

// export const TransferSchema = z.discriminatedUnion("transferCostType", [TransferWithoutCost, TransferWithCost])
export const TransferSchema = BasicTransferSchema

// export const TransferWithIdSchema = z.discriminatedUnion("transferCostType", [
//   TransferWithoutCost.extend({ id: z.string() }),
//   TransferWithCost.extend({ id: z.string() })
// ])
export const TransferWithIdSchema = TransferSchema.extend({ id: z.string() })

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
  .refine(
    ({ asAtYear, context: { livingExpenses } }) => {
      sortByFromDate(livingExpenses)
      return livingExpenses[0].fromYear === asAtYear
    },
    ({ asAtYear }) => {
      return {
        message: `The first row should have a year matching the scenario's 'As at year' of ${asAtYear}`,
        path: ["context.livingExpenses", 0, "fromYear"]
      }
    }
  )
  .refine(
    ({ context: { livingExpenses } }) => {
      sortByFromDate(livingExpenses)

      // check for duplicates
      const set = new Set(livingExpenses.map((it) => it.fromYear))
      return set.size === livingExpenses.length
    },
    ({ context: { livingExpenses } }) => {
      const duplicateIndex = livingExpenses.findIndex((item, index) => {
        if (index === 0) return false
        if (item.fromYear === livingExpenses[index - 1].fromYear) return true
        return false
      })
      return {
        message: `This row has the same year as the previous row.`,
        path: ["context.livingExpenses", duplicateIndex, "fromYear"]
      }
    }
  )
  .refine(
    ({ asAtYear, context: { inflation } }) => {
      sortByFromDate(inflation)
      return inflation[0].fromYear === asAtYear
    },
    ({ asAtYear }) => {
      return {
        message: `The first row should have a year matching the scenario's 'As at year' of ${asAtYear}`,
        path: ["context.inflation", 0, "fromYear"]
      }
    }
  )
  .refine(
    ({ context: { inflation } }) => {
      sortByFromDate(inflation)

      // check for duplicates
      const set = new Set(inflation.map((it) => it.fromYear))
      return set.size === inflation.length
    },
    ({ context: { inflation } }) => {
      const duplicateIndex = inflation.findIndex((item, index) => {
        if (index === 0) return false
        if (item.fromYear === inflation[index - 1].fromYear) return true
        return false
      })
      return {
        message: `This row has the same year as the previous row.`,
        path: ["context.inflation", duplicateIndex, "fromYear"]
      }
    }
  )
  .refine(
    ({ asAtYear, transfers }) => {
      if (!transfers) return true

      const invalidTransfer = transfers.find((transfer) => transfer.year < asAtYear)
      if (invalidTransfer) return false
      return true
    },

    ({ asAtYear, transfers }) => {
      const invalidTransferIndex = transfers?.findIndex((transfer) => transfer.year < asAtYear)

      return {
        message: `Transfer year must be >= 'As at year' of ${asAtYear}`,
        path: ["transfers", invalidTransferIndex ?? ""]
      }
    }
  )

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
