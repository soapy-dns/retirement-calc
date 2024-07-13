import { z } from "zod"

import { drawdownOrderValidator, incomeValidator, propertyValidator } from "./validation"
import { CountryEnum, IsOptionalValidYear, YesNoSchema } from "./schemaUtils"

export const AssetClassEnum = z.enum(["AuBank", "AuSuper", "AuProperty", "Salary", "AuDefinedBenefits", "AuShares"])
export type AssetClass = z.infer<typeof AssetClassEnum>

// FIXME: I can't get these to work by importing
// const IsOptionalFutureOrCurrentYear = z.number().optional()
// const CountryEnum = z.enum(["AU", "SC", "EN"])

const IncomeDetailsSchema = z.object({
  incomeAmt: z.number().min(1),
  incomeStartYear: IsOptionalValidYear,
  incomeEndYear: IsOptionalValidYear
})

const PropertyDetailsSchema = z.object({
  isRented: z.boolean().optional(),
  rentalIncomePerMonth: z.number().gte(0).optional(),
  rentalExpensesPerMonth: z.number().gte(0).optional(),
  rentalStartYear: IsOptionalValidYear,
  rentalEndYear: IsOptionalValidYear
})

const DrawdownDetailsSchema = z
  .object({
    drawdownFrom: IsOptionalValidYear,
    drawdownOrder: z.number().optional(), // should really be an enum
    preferredMinAmt: z.number().optional()
  })
  .optional()
export type IncomeDetails = z.infer<typeof IncomeDetailsSchema>

const AssetBaseSchema = z.object({
  id: z.string(),
  className: AssetClassEnum,
  name: z.string(),
  description: z.string().optional(),
  assetOwners: z.string().array(), // assetOwners different for different classNames certainly diff validation
  // assetOwners: z.string().array().nonempty(),
  country: CountryEnum.optional(), // defaults to AU
  rateVariation: z.number().optional()
})
export type BaseAsset = z.infer<typeof AssetBaseSchema>

const CapitalAssetSchema = AssetBaseSchema.extend({
  value: z.number()
})
export type CapitalAsset = z.infer<typeof CapitalAssetSchema>

const LiquidAssetSchema = CapitalAssetSchema.extend({
  canDrawdown: z.boolean(),
  drawdown: DrawdownDetailsSchema
})
export type LiquidAsset = z.infer<typeof LiquidAssetSchema>

const IncomeAssetSchema = AssetBaseSchema.extend({
  income: IncomeDetailsSchema
})
export type IncomeAsset = z.infer<typeof IncomeAssetSchema>

const PropertySchema = CapitalAssetSchema.extend({
  className: z.literal("AuProperty"),
  property: PropertyDetailsSchema
})
export type PropertyAsset = z.infer<typeof PropertySchema>

const SalarySchema = IncomeAssetSchema.extend({
  className: z.literal("Salary")
})

const DefinedBenefitsSchema = IncomeAssetSchema.extend({
  className: z.literal("AuDefinedBenefits"),
  isStatePension: z.boolean()
})
export type DefinedBenefits = z.infer<typeof DefinedBenefitsSchema>

// export for mocking
export const CashSchema = LiquidAssetSchema.extend({
  className: z.literal("AuBank"),
  incomeBucket: z.boolean()
})
export type CashAsset = z.infer<typeof CashSchema>

export const SuperSchema = LiquidAssetSchema.extend({
  className: z.literal("AuSuper")
})

export const SharesSchema = LiquidAssetSchema.extend({
  className: z.literal("AuShares")
})

export const AssetSchema = z
  .discriminatedUnion("className", [
    PropertySchema,
    SalarySchema,
    DefinedBenefitsSchema,
    CashSchema,
    SuperSchema,
    SharesSchema
  ])
  .refine(incomeValidator.validator, incomeValidator.options)
  .refine(drawdownOrderValidator.validator, drawdownOrderValidator.options)
  .refine(propertyValidator.validator, propertyValidator.options)

export type IAsset = z.infer<typeof AssetSchema>
