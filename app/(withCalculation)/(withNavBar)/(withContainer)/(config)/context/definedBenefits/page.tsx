"use client"

import EditPageLayout from "@/app/(withCalculation)/(withoutNavBar)/components/EditPageLayout"
import { ContextConfig } from "@/app/lib/data/schema/config"
import { RadioButtonQuestion, RadioQuestionVariant } from "@/app/ui/components/form/RadioButtonQuestion"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { yesNoOptions } from "@/app/ui/utils/yesNoOptions"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { contextConstants } from "../contextConstants"

interface ChangedFormData {
  useInflationRateAu: string
}

const getStringValue = (bool: boolean): "Y" | "N" => {
  return bool ? "Y" : "N"
}
const DefinedBenefitsPage: React.FC = () => {
  const navigation = useNavigation()
  const { selectedScenario, updateScenario } = useContext(ScenarioContext)
  const { context } = selectedScenario
  const { definedBenefitsAu } = context
  const { control, handleSubmit } = useForm<ChangedFormData>({
    defaultValues: { useInflationRateAu: getStringValue(definedBenefitsAu.useInflationRate) }
  })

  const handleBack = () => {
    navigation.goBack()
  }

  const onSubmit = (data: ChangedFormData) => {
    const { useInflationRateAu } = data
    const { context } = selectedScenario

    const useInflationRateConfig = useInflationRateAu === "Y"

    const updatedContext: ContextConfig = {
      ...context,
      definedBenefitsAu: {
        useInflationRate: useInflationRateConfig
      }
    }

    const updatedScenario = { ...selectedScenario, context: updatedContext }

    updateScenario(updatedScenario)
    navigation.goBack()
  }

  return (
    <EditPageLayout
      heading="Defined benefits pension"
      backText="Back to context"
      cancelText="Cancel and return to context"
      saveText="Save changes"
      handleSubmit={handleSubmit(onSubmit)}
      handleBack={handleBack}
      handleCancel={handleBack}
    >
      <form>
        {/* @ts-ignore */}
        <RadioButtonQuestion
          id="useInflationRateAu"
          control={control}
          label={contextConstants.USE_INFLATION_RATE.LABEL}
          defaultValue={getStringValue(definedBenefitsAu.useInflationRate)}
          values={yesNoOptions}
          variant={RadioQuestionVariant.BLOCK}
          // validationRules={changeDetailsValidation}
          helpText={contextConstants.USE_INFLATION_RATE.HELP_TEXT}
        />
        {/* <InputQuestion
          id="interestRate"
          control={control}
          label={contextConstants.CASH_INTEREST_RATE.LABEL}
          defaultValue={definedBenefitsAu.useInflationRate}
          editable={true}
          // validationRules={changeDetailsValidation}
          restrictedCharSet={DECIMALS_ONLY}
          helpText={contextConstants.CASH_INTEREST_RATE.HELP_TEXT}
        /> */}
      </form>
    </EditPageLayout>
  )
}

export default DefinedBenefitsPage
