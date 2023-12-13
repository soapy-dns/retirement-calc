import { Country } from "calculations/tax/taxCalcs/types"
import { ContextData } from "data/types"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { ScenarioContext } from "view/context/ScenarioContext"
import { useNavigation } from "view/hooks/useNavigation"
import { EditPageLayout } from "../../../layouts/EditPageLayout"
import { GeneralContext } from "./GeneralContext"

interface ChangedFormData {
  taxResident: Country
  currency: Country
  au2ukExchangeRate: number
}

export const GeneralContextEditPage: React.FC = () => {
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

    const updatedContext: ContextData = {
      ...context,
      taxResident: data.taxResident,
      currency: data.currency,
      au2ukExchangeRate: data.au2ukExchangeRate
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
      <GeneralContext control={control} taxResident={taxResident} currency={currency} />
    </EditPageLayout>
  )
}
