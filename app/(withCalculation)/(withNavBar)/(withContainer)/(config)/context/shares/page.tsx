"use client"

import EditPageLayout from "@/app/(withCalculation)/(withoutNavBar)/components/EditPageLayout"
import { ContextConfig } from "@/app/lib/data/schema/config"
import { DECIMALS_ONLY } from "@/app/ui/components/common/formRegExes"
import { InputQuestion } from "@/app/ui/components/form/InputQuestion"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { contextConstants } from "../contextConstants"

interface ChangedFormData {
  growthInterestRate: number
  dividendInterestRate: number
}

const SharesPage: React.FC = () => {
  const navigation = useNavigation()

  const { selectedScenario, updateScenario } = useContext(ScenarioContext)
  const { context } = selectedScenario
  const { sharesAu } = context
  const { control, handleSubmit } = useForm<ChangedFormData>({
    defaultValues: {
      growthInterestRate: Math.round(sharesAu?.growthInterestRate * 10000) / 100,
      dividendInterestRate: Math.round(sharesAu?.dividendInterestRate * 10000) / 100
    }
  })

  const handleBack = () => {
    navigation.goBack()
  }

  const onSubmit = async (data: ChangedFormData) => {
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
          // defaultValue={context.sharesAu ? context.sharesAu.growthInterestRate * 100 : "n/a"}
          editable={true}
          // validationRules={changeDetailsValidation}
          restrictedCharSet={DECIMALS_ONLY}
          helpText={contextConstants.SHARES_GROWTH.HELP_TEXT}
        />
        <InputQuestion
          id="dividendInterestRate"
          control={control}
          label={contextConstants.SHARES_INCOME.LABEL}
          suffix="%"
          // defaultValue={context.sharesAu ? context.sharesAu.dividendInterestRate * 100 : "n/a"}
          editable={true}
          // validationRules={changeDetailsValidation}
          restrictedCharSet={DECIMALS_ONLY}
          helpText={contextConstants.SHARES_INCOME.HELP_TEXT}
        />
      </form>
    </EditPageLayout>
  )
}

export default SharesPage
