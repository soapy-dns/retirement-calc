"use client"

import { use } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { type Transfer } from "@/app/lib/data/schema/config"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { useTransfer } from "@/app/ui/hooks/useTransfer"
import EditPageLayout from "@/app/(frontend)/(withoutNavBar)/components/EditPageLayout"
import { TransferFormData, getTransferFormSchema } from "../getTransferFormSchema"
import { useContext } from "react"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { TransferForm } from "../TransferForm"
import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"
import { useSearchParams } from "next/navigation"

const getTransferValuesFromForm = (data: TransferFormData): Omit<Transfer, "id"> => {
  return {
    ...data,
    year: +data.year,
    transferPercent: +data.transferPercent,
    transferCostType: data.transferCostType,
    transferCostValue: data.transferCostType ? data.transferCostValue : 0
  }
}

const marshall = (data: TransferFormData, transfer: Transfer): Transfer => {
  const newFields = getTransferValuesFromForm(data)

  // @ts-ignore TODO:
  return {
    ...transfer,
    ...newFields
  }
}

type Params = Promise<{ id: string }>

export default function TransferEditPage(props: { params: Params }) {
  const params = use(props.params)
  const searchParams = useSearchParams()
  const navigation = useNavigation()
  const { selectedScenario } = useContext(ScenarioContext)
  const { getTransferDetails, updateTransfer, addTransfer } = useTransfer()

  let { id } = params
  const debug = searchParams.get("debug")
  const transfer = getTransferDetails(id) // should I do something different for 'add'?
  const { year, from, to, transferPercent, transferCostType } = transfer || {}

  const methods = useForm<TransferFormData>({
    defaultValues: {
      from,
      to,
      year: year || getCurrentYear(),
      transferPercent: transferPercent || 100,
      transferCostType: transferCostType || "NO_COST",
      transferCostValue: transfer?.transferCostValue || 0
    },
    resolver: zodResolver(getTransferFormSchema(selectedScenario, id))
  })
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = methods

  const onSubmit = async (data: TransferFormData) => {
    if (transfer) {
      const newTransferConfig = marshall(data, transfer)
      const { success } = await updateTransfer(newTransferConfig)
      if (success) navigation.goBack()
    } else {
      const { success } = await addTransfer(getTransferValuesFromForm(data))
      if (success) navigation.goBack()
    }
  }

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <FormProvider {...methods}>
      <EditPageLayout
        heading={id === "add" ? "Add a transfer" : "Edit a transfer"}
        backText="Back to transfers"
        cancelText="Cancel"
        saveText="Save changes"
        handleSubmit={handleSubmit(onSubmit)}
        handleBack={handleBack}
        handleCancel={handleBack}
      >
        <TransferForm control={control} watch={watch} />
        {debug && <pre className="text-primary font-semibold">{JSON.stringify(errors, null, 4)}</pre>}
      </EditPageLayout>
    </FormProvider>
  )
}
