"use client"
// TODO: this can't currently be accessed from the app.  Leaving here for the moment in case we need.

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import EditPageLayout from "@/app/(frontend)/(withoutNavBar)/components/EditPageLayout"
import { ContextConfig } from "@/app/lib/data/schema/config"
import { RadioButtonQuestion, RadioQuestionVariant } from "@/app/ui/components/form/RadioButtonQuestion"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { yesNoOptions } from "@/app/ui/utils/yesNoOptions"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { contextConstants } from "../contextConstants"
import { YesNoSchema } from "@/app/lib/data/schema/config/schemaUtils"

const FormSchema = z.object({
  useInflationRate: YesNoSchema.optional()
})

export type FormDataType = z.infer<typeof FormSchema>

const getStringValue = (bool: boolean): "Y" | "N" => {
  return bool ? "Y" : "N"
}
const DefinedBenefitsPage: React.FC = () => {
  const navigation = useNavigation()
  const { selectedScenario, updateScenario } = useContext(ScenarioContext)
  const { context } = selectedScenario
  const { definedBenefitsAu } = context
  const { control, handleSubmit } = useForm<FormDataType>({
    defaultValues: { useInflationRate: getStringValue(definedBenefitsAu.useInflationRate) },
    resolver: zodResolver(FormSchema)
  })

  const handleBack = () => {
    navigation.goBack()
  }

  const onSubmit = async (data: FormDataType) => {
    const { useInflationRate } = data
    const { context } = selectedScenario

    const useInflationRateConfig = useInflationRate === "Y"

    const updatedContext: ContextConfig = {
      ...context,
      definedBenefitsAu: {
        useInflationRate: useInflationRateConfig
      }
    }

    const updatedScenario = { ...selectedScenario, context: updatedContext }

    const { success } = await updateScenario(updatedScenario)
    if (success) navigation.goBack()
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
          id="useInflationRate"
          control={control}
          label={contextConstants.USE_INFLATION_RATE.LABEL}
          values={yesNoOptions}
          variant={RadioQuestionVariant.BLOCK}
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
