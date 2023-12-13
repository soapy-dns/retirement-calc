"use client"

import EditPageLayout from "@/app/(withCalculation)/(withoutNavBar)/components/EditPageLayout"
import { ContextData } from "@/app/lib/data/types"
import { DECIMALS_ONLY } from "@/app/ui/components/common/formRegExes"
import { InputQuestion } from "@/app/ui/components/form/InputQuestion"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { useContext } from "react"
import { useForm } from "react-hook-form"

import { contextConstants } from "../contextConstants"

interface ChangedFormData {
  growthRate: number
}

const PropertyPage: React.FC = () => {
  const navigation = useNavigation()
  const { selectedScenario, updateScenario } = useContext(ScenarioContext)
  const { context } = selectedScenario
  const { property } = context
  const { control, handleSubmit } = useForm<ChangedFormData>({
    defaultValues: { growthRate: property.growthInterestRate }
  })

  const handleBack = () => {
    navigation.goBack()
  }

  const onSubmit = (data: ChangedFormData) => {
    const { growthRate } = data
    const { context } = selectedScenario

    const updatedContext: ContextData = {
      ...context,
      property: {
        growthInterestRate: growthRate
      }
    }

    const updatedScenario = { ...selectedScenario, context: updatedContext }

    updateScenario(updatedScenario)
    navigation.goBack()
  }

  return (
    <EditPageLayout
      heading="Property"
      backText="Back to context"
      cancelText="Cancel and return to context"
      saveText="Save changes"
      handleSubmit={handleSubmit(onSubmit)}
      handleBack={handleBack}
      handleCancel={handleBack}
    >
      <form>
        {/* @ts-ignore */}
        <InputQuestion
          id="growthRate"
          control={control}
          label={contextConstants.PROPERTY_GROWTH_RATE.LABEL}
          suffix="%"
          defaultValue={context?.property?.growthInterestRate}
          editable={true}
          // validationRules={changeDetailsValidation}
          restrictedCharSet={DECIMALS_ONLY}
          helpText={contextConstants.PROPERTY_GROWTH_RATE.HELP_TEXT}
        />
      </form>
    </EditPageLayout>
  )
}

export default PropertyPage
