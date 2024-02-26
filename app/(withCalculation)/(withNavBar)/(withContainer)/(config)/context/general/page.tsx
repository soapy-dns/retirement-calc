"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import EditPageLayout from "@/app/(withCalculation)/(withoutNavBar)/components/EditPageLayout"
import { Country } from "@/app/lib/calculations/tax/taxCalcs/types"
import { ContextConfig, CountryEnum, IsNumber } from "@/app/lib/data/schema/config"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import GeneralContextForm from "./GeneralContextForm"

const FormSchema = z.object({
  taxResident: CountryEnum,
  currency: CountryEnum,
  au2ukExchangeRate: IsNumber.optional() // TODO: only optional if taxResident !== currency
})
export type FormDataType = z.infer<typeof FormSchema>

const GeneralContextEditPage: React.FC = () => {
  const { selectedScenario, updateScenario } = useContext(ScenarioContext)
  const navigation = useNavigation()

  const { context } = selectedScenario
  const {
    watch,
    handleSubmit,
    control,
    // reset,
    formState: { isDirty }
  } = useForm<FormDataType>({ defaultValues: context, resolver: zodResolver(FormSchema) })

  const onSubmit = async (data: FormDataType) => {
    const { context } = selectedScenario

    const updatedContext: ContextConfig = {
      ...context,
      taxResident: data.taxResident,
      currency: data.currency,
      au2ukExchangeRate: data.au2ukExchangeRate && +data?.au2ukExchangeRate

      // au2ukExchangeRate: data.au2ukExchangeRate ? +data.au2ukExchangeRate : undefined
    }

    const updatedScenario = { ...selectedScenario, context: updatedContext }

    const { success } = await updateScenario(updatedScenario)
    if (success) navigation.goBack()
  }
  const handleBack = () => {
    navigation.goBack()
  }

  // Innefficent? FIXME:
  const taxResident = watch("taxResident", context.taxResident)
  const currency = watch("currency", context.currency)

  return (
    <EditPageLayout
      heading={"Edit tax and currency details"}
      backText="Back to main context"
      cancelText="Cancel and return to context"
      saveText="Save changes"
      handleSubmit={handleSubmit(onSubmit)}
      handleBack={handleBack}
      handleCancel={handleBack}
    >
      {/* @ts-ignore */}
      <GeneralContextForm control={control} taxResident={taxResident} currency={currency} />
    </EditPageLayout>
  )
}

export default GeneralContextEditPage
