"use client"
import { useForm } from "react-hook-form"
import { AssetEditForm } from "../AssetEditForm"
import { getStartingYear } from "@/app/lib/calculations/utils/getStartingYear"
import { YesNo } from "../../types"
import { IAsset } from "@/app/lib/data/types"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import EditPageLayout from "@/app/(withCalculation)/(withoutNavBar)/components/EditPageLayout"
import { useAsset } from "@/app/ui/hooks/useAsset"
import { useOwner } from "@/app/ui/hooks/useOwner"

const getDrawdownFromValue = (enteredYear?: number): number => {
  const startingYear = getStartingYear()
  if (!enteredYear || enteredYear < startingYear) return startingYear
  return enteredYear
}

interface ChangedFormData {
  name: string
  description: string
  assetType: string // TODO: should be enum?
  value: number
  income: number
  owners: string[]
  earnsIncome: YesNo
  earningsBucket: YesNo
  earningsTaxPerc: number
  isRented?: YesNo
  rentalIncome?: number
  rentalExpenses?: number
  canDrawdown: YesNo
  drawdownOrder?: number // TODO: should be required if canDrawdown true
  drawdownFrom?: number // TODO: should be required if canDrawdown true
  preferredMinAmt?: number
  incomeEndYear?: number
}

const getAssetValuesFromForm = (data: ChangedFormData): Omit<IAsset, "id"> => {
  const {
    name,
    description,
    assetType,
    value,
    income,
    owners,
    canDrawdown,
    drawdownOrder,
    drawdownFrom,
    earnsIncome,
    earningsBucket,
    preferredMinAmt,
    earningsTaxPerc,
    isRented,
    rentalIncome,
    rentalExpenses,
    incomeEndYear
  } = data

  return {
    name,
    description,
    className: assetType,
    value: value ? +value : 0, // TODO: this should really be undefined but it breaks stuff
    income: income ? +income : undefined,
    assetOwners: owners,
    canDrawdown: canDrawdown === "Y",
    drawdownOrder,
    drawdownFrom,
    // incomeProducing: earnsIncome === "Y",
    incomeBucket: earningsBucket === "Y",
    preferredMinAmt: preferredMinAmt ? +preferredMinAmt : undefined,
    percOfEarningsTaxable: +earningsTaxPerc,
    isRented: isRented === "Y",
    rentalIncomePerMonth: rentalIncome ? +rentalIncome : undefined,
    rentalExpensesPerMonth: rentalExpenses ? +rentalExpenses : undefined,
    incomeEndYear: incomeEndYear ? +incomeEndYear : undefined
  }
}

const marshall = (data: ChangedFormData, asset: IAsset) => {
  const newFields = getAssetValuesFromForm(data)

  const newAssets = {
    ...asset,
    ...newFields
  }

  return newAssets
}

interface Props {
  add: boolean
}

export default function AssetEditPage({ params }: { params: { id: string } }) {
  let { id } = params
  const navigation = useNavigation()

  const { getAssetDetails, updateAsset, addAsset } = useAsset()
  const { getOwners } = useOwner()
  const asset = getAssetDetails(id)
  const owners = getOwners()

  const {
    name,
    description,
    className,
    value,
    income,
    assetOwners = [],
    percOfEarningsTaxable,
    // incomeProducing,
    incomeBucket,
    preferredMinAmt,
    canDrawdown,
    drawdownOrder,
    drawdownFrom,
    isRented,
    rentalExpensesPerMonth,
    rentalIncomePerMonth,
    incomeEndYear
  } = asset || {}

  // TODO: I'm sure we can do this better for radio buttons
  const canDrawdownValue = canDrawdown ? "Y" : "N"
  // const incomeEarningValue = incomeProducing ? "Y" : "N"
  const earningsAccumulated = incomeBucket ? "Y" : "N"
  const isRentedString = isRented ? "Y" : "N"

  const {
    handleSubmit,
    watch,
    control,
    register,
    formState: { isDirty }
  } = useForm<ChangedFormData>({
    defaultValues: {
      name,
      description: description,
      assetType: className,
      value,
      income,
      owners: assetOwners,
      // earnsIncome: incomeEarningValue,
      earningsBucket: earningsAccumulated,
      preferredMinAmt: preferredMinAmt ?? 0,
      earningsTaxPerc: percOfEarningsTaxable ?? 100,
      isRented: isRentedString,
      rentalExpenses: rentalExpensesPerMonth,
      rentalIncome: rentalIncomePerMonth,
      canDrawdown: canDrawdownValue,
      drawdownOrder,
      drawdownFrom: getDrawdownFromValue(drawdownFrom),
      incomeEndYear
    }
  })

  if (!owners) return <div>No owners found</div>

  const onSubmit = (data: ChangedFormData) => {
    if (asset) {
      const newAssetConfig = marshall(data, asset)
      updateAsset(newAssetConfig)
    } else {
      addAsset(getAssetValuesFromForm(data))
    }

    navigation.goBack()
  }

  const handleBack = () => {
    navigation.goBack()
  }

  const assetType = watch("assetType")
  const drawdownSet = watch("canDrawdown")
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
