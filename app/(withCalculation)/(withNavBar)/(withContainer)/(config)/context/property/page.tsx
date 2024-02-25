"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import EditPageLayout from "@/app/(withCalculation)/(withoutNavBar)/components/EditPageLayout"
import { ContextConfig, IsNumber } from "@/app/lib/data/schema/config"
import { DECIMALS_ONLY } from "@/app/ui/components/common/formRegExes"
import { InputQuestion } from "@/app/ui/components/form/InputQuestion"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { useContext } from "react"
import { useForm } from "react-hook-form"

import { contextConstants } from "../contextConstants"

const FormSchema = z.object({
  growthRate: IsNumber
})
export type FormDataType = z.infer<typeof FormSchema>

const PropertyPage: React.FC = () => {
  const navigation = useNavigation()
  const { selectedScenario, updateScenario } = useContext(ScenarioContext)
  const { context } = selectedScenario
  const { property } = context
  const { control, handleSubmit } = useForm<FormDataType>({
    defaultValues: { growthRate: Math.round(property.growthInterestRate * 10000) / 100 },
    resolver: zodResolver(FormSchema)
  })

  const handleBack = () => {
    navigation.goBack()
  }

  const onSubmit = async (data: FormDataType) => {
    const { growthRate } = data
    const { context } = selectedScenario

    const updatedContext: ContextConfig = {
      ...context,
      property: {
        growthInterestRate: growthRate / 100
      }
    }

    const updatedScenario = { ...selectedScenario, context: updatedContext }

    const { success } = await updateScenario(updatedScenario)
    if (success) navigation.goBack()
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
          // defaultValue={context?.property?.growthInterestRate}
          editable={true}
          restrictedCharSet={DECIMALS_ONLY}
          helpText={contextConstants.PROPERTY_GROWTH_RATE.HELP_TEXT}
        />
      </form>
    </EditPageLayout>
  )
}

export default PropertyPage
