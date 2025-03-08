"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import EditPageLayout from "@/app/(frontend)/(withoutNavBar)/components/EditPageLayout"
import { ContextConfig } from "@/app/lib/data/schema/config"
import { DECIMALS_ONLY } from "@/app/ui/components/common/formRegExes"
import { InputQuestion } from "@/app/ui/components/form/InputQuestion"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { useContext, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { contextConstants } from "../contextConstants"
import { IsFormNumber } from "@/app/lib/data/schema/config/schemaUtils"
import { ChangesNotSavedModal } from "@/app/ui/components/modals/ChangesNotSavedModal"

const FormSchema = z.object({
  growthRate: IsFormNumber
})
export type FormDataType = z.infer<typeof FormSchema>

const PropertyPage: React.FC = () => {
  const navigation = useNavigation()
  const { selectedScenario, updateScenario } = useContext(ScenarioContext)
  const [showChangesNotSavedModal, setShowChangesNotSavedModal] = useState<boolean>(false)

  const { context } = selectedScenario
  const { property } = context
  const methods = useForm<FormDataType>({
    defaultValues: { growthRate: Math.round(property.growthInterestRate * 10000) / 100 },
    resolver: zodResolver(FormSchema)
  })
  const {
    control,
    handleSubmit,
    formState: { isDirty }
  } = methods

  const handleBack = () => {
    if (isDirty) {
      setShowChangesNotSavedModal(true)
    } else {
      navigation.goBack()
    }
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
    <FormProvider {...methods}>
      <EditPageLayout
        heading="Property"
        backText="Back to context"
        cancelText="Cancel"
        saveText="Save changes"
        handleSubmit={handleSubmit(onSubmit)}
        handleBack={handleBack}
        handleCancel={handleBack}
      >
        <form>
          {/* @ts-ignore */}
          <InputQuestion
            id="growthRate"
            // control={control}
            label={contextConstants.PROPERTY_GROWTH_RATE.LABEL}
            suffix="%"
            // defaultValue={context?.property?.growthInterestRate}
            editable={true}
            restrictedCharSet={DECIMALS_ONLY}
            helpText={contextConstants.PROPERTY_GROWTH_RATE.HELP_TEXT}
          />
        </form>
        <ChangesNotSavedModal
          showModal={showChangesNotSavedModal}
          handleCancel={() => setShowChangesNotSavedModal(false)}
          continueAnyway={() => navigation.goBack()}
        />
      </EditPageLayout>
    </FormProvider>
  )
}

export default PropertyPage
