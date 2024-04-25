"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// import { z } from "@/app/lib/data/schema/config/validation/customZod"
import { z } from "zod"

import { AssetEditForm } from "../AssetEditForm"
import {
  IAsset,
  AssetClassEnum,
  IncomeAsset,
  CapitalAsset,
  PropertyAsset,
  BaseAsset,
  LiquidAsset,
  CashAsset
} from "@/app/lib/data/schema/config"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import EditPageLayout from "@/app/(withCalculation)/(withoutNavBar)/components/EditPageLayout"
import { useAsset } from "@/app/ui/hooks/useAsset"
import { useOwner } from "@/app/ui/hooks/useOwner"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"
import { isCapitalAsset, isCashAsset, isIncomeAsset, isLiquidAsset, isPropertyAsset } from "@/app/ui/utils"
import { YesNo } from "../../types"
import {
  CountryEnum,
  IsFormNumber,
  IsOptionalFutureOrCurrentYear,
  IsFormNumberOpt,
  YesNoSchema
  // ZodInputStringPipe
} from "@/app/lib/data/schema/config/schemaUtils"

// There is some duplication with AssetSchema - how can we minimise this?
const FormSchema = z
  .object({
    name: z.string().min(4),
    description: z.string().optional(),
    country: CountryEnum,
    assetType: AssetClassEnum,
    value: IsFormNumberOpt,
    owners: z.string().array().nonempty({ message: "An asset must have at least 1 owner." }),
    // assetOwners: z.string().array().nonempty(),
    incomeBucket: YesNoSchema.optional(),
    canDrawdown: YesNoSchema.optional(), //.transform((val) => val === "Y"),
    drawdownFrom: IsOptionalFutureOrCurrentYear,
    drawdownOrder: IsFormNumberOpt,
    preferredMinAmt: IsFormNumberOpt,
    isRented: YesNoSchema.optional(),
    rentalStartYear: IsOptionalFutureOrCurrentYear,
    rentalEndYear: IsOptionalFutureOrCurrentYear,
    rentalIncome: IsFormNumberOpt,
    rentalExpenses: IsFormNumberOpt,
    incomeAmt: IsFormNumberOpt, // value and income should be mutually exclusive
    incomeStartYear: IsOptionalFutureOrCurrentYear,
    incomeEndYear: IsOptionalFutureOrCurrentYear,
    rateVariation: IsFormNumberOpt
  })
  .refine(
    ({ assetType, value }) => {
      // TODO: this is cast to undefined if itis a string
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
      return incomeStartYear < incomeEndYear
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

type FormDataType = z.output<typeof FormSchema>

const getAssetConfigFromForm = (data: FormDataType): Omit<IAsset, "id"> => {
  console.log("getAssetConfigFromForm", getAssetConfigFromForm)
  const {
    name,
    description,
    country,
    assetType,
    value,
    owners,
    canDrawdown,
    drawdownOrder,
    drawdownFrom,
    incomeBucket,
    preferredMinAmt,
    isRented,
    rentalStartYear,
    rentalEndYear,
    rentalIncome,
    rentalExpenses,
    incomeAmt,
    incomeStartYear,
    incomeEndYear,
    rateVariation
  } = data

  console.log("rateVariation", rateVariation)

  // strings should already be coerced into strings by zod
  const assetConfig: Omit<BaseAsset, "id"> = {
    name,
    description,
    country,
    className: assetType,
    assetOwners: owners,
    rateVariation: rateVariation ? +rateVariation : undefined
  }
  if (isCapitalAsset(assetType)) {
    const capitalAsset = assetConfig as CapitalAsset
    if (value) {
      capitalAsset.value = +value
    }
  }

  if (isIncomeAsset(assetType) && incomeAmt) {
    const incomeAssetConfig = assetConfig as IncomeAsset
    incomeAssetConfig.income = {
      incomeAmt: +incomeAmt,
      incomeStartYear,
      incomeEndYear
    }
  }

  if (isPropertyAsset(assetType)) {
    const propertyAssetConfig = assetConfig as PropertyAsset
    propertyAssetConfig.property = {
      isRented: isRented === "Y",
      rentalStartYear,
      rentalEndYear,
      rentalIncomePerMonth: rentalIncome ? +rentalIncome : undefined,
      rentalExpensesPerMonth: rentalExpenses ? +rentalExpenses : undefined
    }
  }

  if (isLiquidAsset(assetType)) {
    const liquidAssetConfig = assetConfig as LiquidAsset
    liquidAssetConfig.canDrawdown = canDrawdown === "Y"

    if (liquidAssetConfig.canDrawdown) {
      const drawdown = {
        drawdownOrder: drawdownOrder ? +drawdownOrder : undefined,
        drawdownFrom: drawdownFrom ? +drawdownFrom : undefined,
        preferredMinAmt: preferredMinAmt ? +preferredMinAmt : undefined
      }
      liquidAssetConfig.drawdown = drawdown
    }
  }

  if (isCashAsset(assetType)) {
    const cashAssetConfig = assetConfig as CashAsset
    cashAssetConfig.incomeBucket = incomeBucket === "Y"
  }

  return assetConfig
}

const marshall = (data: FormDataType, assetConfig: IAsset): IAsset => {
  const newFields = getAssetConfigFromForm(data)

  return {
    ...assetConfig,
    ...newFields
  } as IAsset
}

export default function AssetEditPage({ params }: { params: { id: string } }) {
  let { id } = params
  const navigation = useNavigation()

  const { getAssetDetails, updateAsset, addAsset, hasTransfers } = useAsset()
  const { getOwners } = useOwner()
  const assetConfig = getAssetDetails(id)
  const owners = getOwners()

  const { name, description, country = "AU", className, assetOwners = [], rateVariation } = assetConfig || {}

  let canDrawdown, drawdownFrom, drawdownOrder, preferredMinAmt, drawdown
  if (className && isLiquidAsset(className)) {
    ;({ canDrawdown, drawdown } = assetConfig as LiquidAsset)
    if (drawdown) {
      ;({ drawdownFrom, drawdownOrder, preferredMinAmt } = drawdown)
    }
  }

  let incomeAmt, incomeStartYear, incomeEndYear

  if (className && isIncomeAsset(className)) {
    const { income } = assetConfig as IncomeAsset
    ;({ incomeAmt, incomeStartYear, incomeEndYear } = income)
  }

  let value
  if (className && isCapitalAsset(className)) {
    ;({ value } = assetConfig as CapitalAsset)
  }
  let isRented, rentalStartYear, rentalEndYear, rentalExpensesPerMonth, rentalIncomePerMonth
  if (className && isPropertyAsset(className)) {
    const { property } = assetConfig as PropertyAsset
    ;({ isRented, rentalStartYear, rentalEndYear, rentalExpensesPerMonth, rentalIncomePerMonth } = property)
  }

  let incomeAccumulated: YesNo | undefined
  if (className && isCashAsset(className)) {
    const cashAssetConfig = assetConfig as CashAsset
    incomeAccumulated = cashAssetConfig.incomeBucket ? "Y" : "N"
  }

  const canDrawdownValue = canDrawdown ? "Y" : "N"
  const isRentedString = isRented ? "Y" : "N"
  const {
    handleSubmit,
    watch,
    control,
    register,
    formState: { errors }
  } = useForm<FormDataType>({
    defaultValues: {
      name,
      description: description,
      country,
      assetType: className,
      value,
      owners: assetOwners,
      incomeBucket: incomeAccumulated,
      preferredMinAmt: preferredMinAmt,
      isRented: isRentedString,
      rentalStartYear,
      rentalEndYear,
      rentalExpenses: rentalExpensesPerMonth,
      rentalIncome: rentalIncomePerMonth,
      canDrawdown: canDrawdownValue,
      drawdownOrder,
      drawdownFrom: drawdownFrom,
      incomeAmt,
      incomeStartYear,
      incomeEndYear,
      rateVariation
    },
    resolver: zodResolver(FormSchema)
  })

  if (!owners) return <div>No owners found</div>

  const onSubmit = async (data: FormDataType) => {
    console.log("onSubmit data", data)
    // let success = false
    if (assetConfig) {
      const newAssetConfig = marshall(data, assetConfig)
      const { success: updateSuccess } = await updateAsset(newAssetConfig)
      // success = updateSuccess
    } else {
      const { success: addSuccess } = await addAsset(getAssetConfigFromForm(data))
      // success = addSuccess
    }

    // backend could still say it an error, but I don't think we should stop nav at this point
    // because the bakend could be complaining about another asset, not this one.
    navigation.goBack()
  }

  const handleBack = () => {
    navigation.goBack()
  }

  const assetType = watch("assetType")
  const drawdownSet = watch("canDrawdown") || "N"
  const isRentedFormValue = watch("isRented") || "N"

  return (
    <EditPageLayout
      heading={id === "add" ? "Add an asset" : "Edit an asset"}
      backText="Back to assets"
      cancelText="Cancel and return to assets"
      saveText="Save changes"
      handleSubmit={handleSubmit(onSubmit)}
      handleBack={handleBack}
      handleCancel={handleBack}
    >
      {/* {errors && <pre>{JSON.stringify(errors, null, 4)}</pre>} */}
      {assetConfig && hasTransfers(assetConfig) && (
        <Alert alertType={AlertType.info} heading="This asset has transfers" />
      )}
      {/* @ts-ignore */}
      <AssetEditForm
        control={control}
        assetType={assetType}
        drawdownSet={drawdownSet}
        isRentedFormValue={isRentedFormValue}
        owners={owners}
        register={register}
      />
    </EditPageLayout>
  )
}
