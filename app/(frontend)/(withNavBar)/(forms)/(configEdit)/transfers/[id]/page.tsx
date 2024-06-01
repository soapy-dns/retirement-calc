"use client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { TransferForm } from "../TransferForm"
import { type Transfer } from "@/app/lib/data/schema/config"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { useTransfer } from "@/app/ui/hooks/useTransfer"
import EditPageLayout from "@/app/(frontend)/(withoutNavBar)/components/EditPageLayout"
import { IsFormNumberOpt, IsFutureOrCurrentYear, YesNoSchema } from "@/app/lib/data/schema/config/schemaUtils"

const getTransferValuesFromForm = (data: FormDataType): Omit<Transfer, "id"> => {
  return {
    ...data,
    year: +data.year,
    value: data.value ? +data.value : undefined,
    migrateAll: data.migrateAll === "Y",
    costOfTransfer: data.costOfTransfer ? +data.costOfTransfer : undefined
  }
}

const FormSchema = z.object({
  year: IsFutureOrCurrentYear,
  from: z.string(),
  to: z.string(),
  migrateAll: YesNoSchema.optional(),
  value: IsFormNumberOpt,
  costOfTransfer: IsFormNumberOpt
})

type FormDataType = z.infer<typeof FormSchema>

const marshall = (data: FormDataType, transfer: Transfer): Transfer => {
  const newFields = getTransferValuesFromForm(data)

  // @ts-ignore TODO:
  return {
    ...transfer,
    ...newFields
  }
}

export default function TransferEditPage({ params }: { params: { id: string } }) {
  let { id } = params
  const navigation = useNavigation()
  const { getTransferDetails, updateTransfer, addTransfer } = useTransfer()
  const transfer = getTransferDetails(id) // should I do something different for 'add'?

  const { from, to, value, year, migrateAll = true, costOfTransfer } = transfer || {}
  const migrateAllFormVal = migrateAll ? "Y" : "N"

  const { handleSubmit, watch, control } = useForm<FormDataType>({
    defaultValues: { from, to, value, year, migrateAll: migrateAllFormVal, costOfTransfer },
    resolver: zodResolver(FormSchema)
  })

  const onSubmit = async (data: FormDataType) => {
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

  //   This is probably a really bad way to do it as we will re-render the entire form when one value changes - FIXME:
  const migrateAllValue = watch("migrateAll")
  // return <div>Dynamic page {params.id}</div>

  return (
    <EditPageLayout
      heading={id === "add" ? "Add a transfer" : "Edit a transfer"}
      backText="Back to transfers"
      cancelText="Cancel and return to transfers"
      saveText="Save changes"
      handleSubmit={handleSubmit(onSubmit)}
      handleBack={handleBack}
      handleCancel={handleBack}
    >
      {/* @ts-ignore */}
      <TransferForm control={control} showValue={migrateAllValue === "N"} />
    </EditPageLayout>
  )
}
