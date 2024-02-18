"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { AssetEditForm } from "../AssetEditForm"
// import { getStartingYear } from "@/app/lib/calculations/utils/getStartingYear"
// import { YesNo } from "../../types"
import { AssetType, IAsset, CountryEnum, YearConstraint, YesNoSchema } from "@/app/lib/data/schema/config"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import EditPageLayout from "@/app/(withCalculation)/(withoutNavBar)/components/EditPageLayout"
import { useAsset } from "@/app/ui/hooks/useAsset"
import { useOwner } from "@/app/ui/hooks/useOwner"
import { Country } from "@/app/lib/calculations/tax/taxCalcs/types"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"
import { incomeValidator } from "@/app/lib/data/schema/config/validation"

// const getDrawdownFromValue = (enteredYear?: number): number => {
//   const startingYear = getStartingYear()
//   if (!enteredYear || enteredYear < startingYear) return startingYear
//   return +enteredYear
// }

// There is some duplication with AssetSchema - how can we minimise this?
const FormSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    country: CountryEnum,
    assetType: z.string(),
    value: z.coerce.number().gte(0).optional(), // can we make this optional?
    income: z.coerce.number().optional(), // value and income should be mutually exclusive
    owners: z.string().array(),
    // assetOwners: z.string().array().nonempty(),
    incomeBucket: YesNoSchema.optional(),
    canDrawdown: YesNoSchema.optional(),
    drawdownFrom: YearConstraint.optional(),
    drawdownOrder: z.coerce.number().optional(),
    preferredMinAmt: z.coerce.number().optional(),
    isRented: YesNoSchema.optional(),
    rentalIncome: z.coerce.number().gte(0).optional(),
    rentalExpenses: z.coerce.number().gte(0).optional(),
    incomeStartYear: YearConstraint.optional(),
    incomeEndYear: YearConstraint.optional()
  })
  .refine(incomeValidator.validator, incomeValidator.options)

type FormDataType = z.infer<typeof FormSchema>

const getAssetValuesFromForm = (data: FormDataType): Omit<AssetType, "id"> => {
  const {
    name,
    description,
    country,
    assetType,
    value,
    income,
    owners,
    canDrawdown,
    drawdownOrder,
    drawdownFrom,
    incomeBucket,
    preferredMinAmt,
    isRented,
    rentalIncome,
    rentalExpenses,
    incomeStartYear,
    incomeEndYear
  } = data

  // strings should already be coerced into strings by zod
  return {
    name,
    description,
    country,
    className: assetType,
    value: value || 0, // TODO: make value optional
    // value: value ? +value : 0, // TODO: this should really be undefined but it breaks stuff
    income: income ? +income : undefined,
    assetOwners: owners,
    canDrawdown: canDrawdown === "Y",
    drawdownOrder: drawdownOrder ? +drawdownOrder : undefined,
    drawdownFrom: drawdownFrom ? +drawdownFrom : undefined,
    incomeBucket: incomeBucket === "Y",
    preferredMinAmt: preferredMinAmt ? +preferredMinAmt : undefined,
    isRented: isRented === "Y",
    rentalIncomePerMonth: rentalIncome ? +rentalIncome : undefined,
    rentalExpensesPerMonth: rentalExpenses ? +rentalExpenses : undefined,
    incomeStartYear: incomeStartYear ? +incomeStartYear : undefined,
    incomeEndYear: incomeEndYear ? +incomeEndYear : undefined
  }
}

const marshall = (data: FormDataType, asset: IAsset) => {
  const newFields = getAssetValuesFromForm(data)

  const newAssets = {
    ...asset,
    ...newFields
  }

  return newAssets
}

export default function AssetEditPage({ params }: { params: { id: string } }) {
  let { id } = params
  const navigation = useNavigation()

  const { getAssetDetails, updateAsset, addAsset, hasTransfers } = useAsset()
  const { getOwners } = useOwner()
  const asset = getAssetDetails(id)
  const owners = getOwners()

  console.log("asset", asset)

  const {
    name,
    description,
    country = "AU",
    className, // assetType
    value,
    income,
    assetOwners = [],
    incomeBucket,
    preferredMinAmt,
    canDrawdown,
    drawdownOrder,
    drawdownFrom,
    isRented,
    rentalExpensesPerMonth,
    rentalIncomePerMonth,
    incomeStartYear,
    incomeEndYear
  } = asset || {}

  // TODO: I'm sure we can do this better for radio buttons
  const canDrawdownValue = canDrawdown ? "Y" : "N"
  const earningsAccumulated = incomeBucket ? "Y" : "N"
  const isRentedString = isRented ? "Y" : "N"

  const {
    handleSubmit,
    watch,
    control,
    register,
    // formState: { isDirty }
    formState: { isDirty, errors }
  } = useForm<FormDataType>({
    defaultValues: {
      name,
      description: description,
      country,
      assetType: className,
      value,
      income,
      owners: assetOwners,
      incomeBucket: earningsAccumulated,
      preferredMinAmt: preferredMinAmt ?? 0,
      isRented: isRentedString,
      rentalExpenses: rentalExpensesPerMonth,
      rentalIncome: rentalIncomePerMonth,
      canDrawdown: canDrawdownValue,
      drawdownOrder,
      drawdownFrom: drawdownFrom,
      incomeStartYear,
      incomeEndYear
    },
    resolver: zodResolver(FormSchema)
  })

  if (!owners) return <div>No owners found</div>

  const onSubmit = async (data: FormDataType) => {
    let success = false
    if (asset) {
      const newAssetConfig = marshall(data, asset)
      const { success: updateSuccess } = await updateAsset(newAssetConfig)
      success = updateSuccess
    } else {
      const { success: addSuccess } = await addAsset(getAssetValuesFromForm(data))
      success = addSuccess
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
      {asset && hasTransfers(asset) && <Alert alertType={AlertType.info} heading="This asset has transfers" />}
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
