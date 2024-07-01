import { z } from "zod"
import {
  CountryEnum,
  IsFormNumberOpt,
  YesNoSchema,
  IsOptionalValidYear
  // ZodInputStringPipe
} from "@/app/lib/data/schema/config/schemaUtils"
import { AssetClassEnum } from "@/app/lib/data/schema/config"
import { isCapitalAsset, isIncomeAsset } from "@/app/ui/utils"

// There is some duplication with AssetSchema - how can we minimise this?
export const FormSchema = z
  .object({
    name: z.string().min(2),
    description: z.string().optional(),
    country: CountryEnum,
    assetType: AssetClassEnum,
    value: IsFormNumberOpt,
    owners: z.string().array().nonempty({ message: "An asset must have at least 1 owner." }),
    // assetOwners: z.string().array().nonempty(),
    incomeBucket: YesNoSchema.optional(),
    canDrawdown: YesNoSchema.optional(), //.transform((val) => val === "Y"),
    drawdownFrom: IsOptionalValidYear,
    drawdownOrder: IsFormNumberOpt,
    preferredMinAmt: IsFormNumberOpt,
    isRented: YesNoSchema.optional(),
    rentalStartYear: IsOptionalValidYear,
    rentalEndYear: IsOptionalValidYear,
    rentalIncome: IsFormNumberOpt,
    rentalExpenses: IsFormNumberOpt,
    incomeAmt: IsFormNumberOpt,
    incomeStartYear: IsOptionalValidYear,
    incomeEndYear: IsOptionalValidYear,
    rateVariation: IsFormNumberOpt,
    isStatePension: YesNoSchema.optional()
  })
  .refine(
    ({ assetType, value }) => {
      if (isCapitalAsset(assetType) && !value) return false
      return true
    },
    { message: "The asset value is required", path: ["value"] }
  )
  .refine(
    ({ assetType, incomeAmt }) => {
      if (isIncomeAsset(assetType) && !incomeAmt) return false
      return true
    },
    { message: "The income amount must be entered for this type of asset", path: ["incomeAmt"] }
  )
  .refine(
    ({ incomeStartYear, incomeEndYear }) => {
      if (!incomeStartYear || !incomeEndYear) return true
      return incomeStartYear <= incomeEndYear
    },
    ({ incomeStartYear, incomeEndYear }) => {
      return {
        message: `The income start year ${incomeStartYear} should be before the income end year ${incomeEndYear}.`,
        path: ["incomeStartYear"]
      }
    }
  )
  .refine(
    ({ canDrawdown, drawdownOrder }) => {
      if (canDrawdown === "Y" && !drawdownOrder) return false
      return true
    },
    {
      message: "A drawdownable asset must have a drawdown order set",
      path: ["canDrawdown"]
    }
  )
  .refine(
    ({ canDrawdown, preferredMinAmt, value }) => {
      if (canDrawdown === "Y" && (preferredMinAmt || 0) > (value || 0)) return false
      return true
    },
    {
      message: "The preferred minimum amount should be less than the initial value.",
      path: ["preferredMinAmt"]
    }
  )
  .refine(
    ({ incomeAmt, owners }) => {
      if (incomeAmt && owners.length > 1) return false
      return true
    },
    { message: "An income asset should only have 1 owner", path: ["owners"] }
  )

export type FormDataType = z.output<typeof FormSchema>
