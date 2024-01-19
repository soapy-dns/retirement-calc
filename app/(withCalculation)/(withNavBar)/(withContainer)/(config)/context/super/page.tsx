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
  investmentReturn: number
  taxationRate: number
}

const SuperPage: React.FC = () => {
  const navigation = useNavigation()

  const { selectedScenario, updateScenario } = useContext(ScenarioContext)
  const { context } = selectedScenario
  const { superAu } = context
  const { control, handleSubmit } = useForm<ChangedFormData>({
    defaultValues: { investmentReturn: superAu?.investmentReturn, taxationRate: superAu?.taxationRate }
  })

  const handleBack = () => {
    navigation.goBack()
  }

  const onSubmit = (data: ChangedFormData) => {
    const { investmentReturn, taxationRate } = data
    const { context } = selectedScenario

    const updatedContext: ContextConfig = {
      ...context,
      superAu: {
        investmentReturn: +investmentReturn,
        taxationRate: +taxationRate
      }
    }
    console.log("--updatedContext--", updatedContext)

    const updatedScenario = { ...selectedScenario, context: updatedContext }

    updateScenario(updatedScenario)
    navigation.goBack()
  }

  return (
    <EditPageLayout
      heading="Super"
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
          id="investmentReturn"
          control={control}
          label={contextConstants.SUPER_INVESTMENT_RETURN.LABEL}
          defaultValue={superAu?.investmentReturn}
          editable={true}
          // validationRules={changeDetailsValidation}
          restrictedCharSet={DECIMALS_ONLY}
          helpText={contextConstants.SUPER_INVESTMENT_RETURN.HELP_TEXT}
        />
        <InputQuestion
          id="taxationRate"
          control={control}
          label={contextConstants.SUPER_TAXATION_RATE.LABEL}
          defaultValue={superAu?.investmentReturn}
          editable={true}
          // validationRules={changeDetailsValidation}
          restrictedCharSet={DECIMALS_ONLY}
          helpText={contextConstants.SUPER_TAXATION_RATE.HELP_TEXT}
        />
      </form>
    </EditPageLayout>
  )
}

export default SuperPage
