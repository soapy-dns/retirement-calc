"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { AssetEditForm } from "../AssetEditForm"
import {
  IAsset,
  IncomeAsset,
  CapitalAsset,
  PropertyAsset,
  BaseAsset,
  LiquidAsset,
  CashAsset,
  DefinedBenefits
} from "@/app/lib/data/schema/config"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import EditPageLayout from "@/app/(frontend)/(withoutNavBar)/components/EditPageLayout"
import { useAsset } from "@/app/ui/hooks/useAsset"
import { useOwner } from "@/app/ui/hooks/useOwner"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"
import {
  isCapitalAsset,
  isCashAsset,
  isDefinedBenefitAsset,
  isIncomeAsset,
  isLiquidAsset,
  isPropertyAsset
} from "@/app/ui/utils"
import { YesNo } from "../../types"
import { ChangesNotSavedModal } from "@/app/ui/components/modals/ChangesNotSavedModal"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { FormDataType, FormSchema } from "./FormSchema"

const getAssetConfigFromForm = (data: FormDataType): Omit<IAsset, "id"> => {
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
    rateVariation,
    isStatePension
  } = data

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

  if (isDefinedBenefitAsset(assetType)) {
    const definedBenefitsConfig = assetConfig as DefinedBenefits
    definedBenefitsConfig.isStatePension = isStatePension === "Y"
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
  const searchParams = useSearchParams()

  const debug = searchParams.get("debug")

  const { getAssetDetails, updateAsset, addAsset, hasTransfers } = useAsset()
  const [showChangesNotSavedModal, setShowChangesNotSavedModal] = useState<boolean>(false)
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

  let isStatePension: YesNo | undefined
  if (className && isDefinedBenefitAsset(className)) {
    const definedBenefitsConfig = assetConfig as DefinedBenefits
    isStatePension = definedBenefitsConfig.isStatePension ? "Y" : "N"
  }

  const canDrawdownValue = canDrawdown ? "Y" : "N"
  const isRentedString = isRented ? "Y" : "N"
  const {
    handleSubmit,
    watch,
    control,
    register,
    formState: { errors, isDirty }
  } = useForm<FormDataType>({
    // TODO: this is a bit of a mess
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
      rateVariation,
      isStatePension
    },
    resolver: zodResolver(FormSchema)
  })

  if (!owners) return <div>No owners found</div>

  const onSubmit = async (data: FormDataType) => {
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
    if (isDirty) {
      setShowChangesNotSavedModal(true)
    } else {
      navigation.goBack()
    }
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
      {debug && errors && <pre>{JSON.stringify(errors, null, 4)}</pre>}
      {assetConfig && hasTransfers(assetConfig) && (
        <Alert alertType={AlertType.warning} heading="Warning">
          This asset has transfers. It is not possible to remove this asset, and altering its initial value may have
          unintended consequences.
        </Alert>
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
      <ChangesNotSavedModal
        showModal={showChangesNotSavedModal}
        handleCancel={() => setShowChangesNotSavedModal(false)}
        continueAnyway={() => navigation.goBack()}
      />
    </EditPageLayout>
  )
}
