"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import EditPageLayout from "@/app/(withCalculation)/(withoutNavBar)/components/EditPageLayout"
import { ContextConfig } from "@/app/lib/data/schema/config"
import { DECIMALS_ONLY } from "@/app/ui/components/common/formRegExes"
import { InputQuestion } from "@/app/ui/components/form/InputQuestion"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { contextConstants } from "../contextConstants"
import { IsFormNumber } from "@/app/lib/data/schema/config/schemaUtils"
import { ChangesNotSavedModal } from "@/app/ui/components/modals/ChangesNotSavedModal"

const FormSchema = z.object({
  growthInterestRate: IsFormNumber,
  dividendInterestRate: IsFormNumber
})
export type FormDataType = z.infer<typeof FormSchema>

const SharesPage: React.FC = () => {
  const navigation = useNavigation()
  const { selectedScenario, updateScenario } = useContext(ScenarioContext)
  const [showChangesNotSavedModal, setShowChangesNotSavedModal] = useState<boolean>(false)

  const { context } = selectedScenario
  const { sharesAu } = context
  const {
    control,
    handleSubmit,
    formState: { isDirty }
  } = useForm<FormDataType>({
    defaultValues: {
      growthInterestRate: Math.round(sharesAu?.growthInterestRate * 10000) / 100,
      dividendInterestRate: Math.round(sharesAu?.dividendInterestRate * 10000) / 100
    },
    resolver: zodResolver(FormSchema)
  })

  const handleBack = () => {
    if (isDirty) {
      setShowChangesNotSavedModal(true)
    } else {
      navigation.goBack()
    }
  }

  const onSubmit = async (data: FormDataType) => {
    const { growthInterestRate, dividendInterestRate } = data
    const { context } = selectedScenario

    const updatedContext: ContextConfig = {
      ...context,
      sharesAu: {
        growthInterestRate: growthInterestRate / 100,
        dividendInterestRate: dividendInterestRate / 100
      }
    }

    const updatedScenario = { ...selectedScenario, context: updatedContext }

    const { success } = await updateScenario(updatedScenario)
    if (success) navigation.goBack()
  }

  return (
    <EditPageLayout
      heading="Shares"
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
          id="growthInterestRate"
          control={control}
          label={contextConstants.SHARES_GROWTH.LABEL}
          suffix="%"
          editable={true}
          restrictedCharSet={DECIMALS_ONLY}
          helpText={contextConstants.SHARES_GROWTH.HELP_TEXT}
        />
        <InputQuestion
          id="dividendInterestRate"
          control={control}
          label={contextConstants.SHARES_INCOME.LABEL}
          suffix="%"
          editable={true}
          restrictedCharSet={DECIMALS_ONLY}
          helpText={contextConstants.SHARES_INCOME.HELP_TEXT}
        />
      </form>
      <ChangesNotSavedModal
        showModal={showChangesNotSavedModal}
        handleCancel={() => setShowChangesNotSavedModal(false)}
        continueAnyway={() => navigation.goBack()}
      />
    </EditPageLayout>
  )
}

export default SharesPage
