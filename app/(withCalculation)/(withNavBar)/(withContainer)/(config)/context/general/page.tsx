"use client"
import EditPageLayout from "@/app/(withCalculation)/(withoutNavBar)/components/EditPageLayout"
import { Country } from "@/app/lib/calculations/tax/taxCalcs/types"
import { ContextConfig } from "@/app/lib/data/schema"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import GeneralContextForm from "./GeneralContextForm"

interface ChangedFormData {
  taxResident: Country
  currency: Country
  au2ukExchangeRate: number
}

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
  } = useForm<ChangedFormData>({ defaultValues: context })

  const onSubmit = (data: ChangedFormData) => {
    const { context } = selectedScenario

    const updatedContext: ContextConfig = {
      ...context,
      taxResident: data.taxResident,
      currency: data.currency,
      au2ukExchangeRate: +data.au2ukExchangeRate
    }

    const updatedScenario = { ...selectedScenario, context: updatedContext }

    updateScenario(updatedScenario)
    navigation.goBack()
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
