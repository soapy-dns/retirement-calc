import EditPageLayout from "@/app/(withCalculation)/(withoutNavBar)/components/EditPageLayout"
import { ContextData } from "@/app/lib/data/types"
import { DECIMALS_ONLY } from "@/app/ui/components/common/formRegExes"
import { InputQuestion } from "@/app/ui/components/form/InputQuestion"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { contextConstants } from "../contextConstants"

interface ChangedFormData {
  interestRate: number
}

export const BankAuEditPage: React.FC = () => {
  const navigation = useNavigation()
  const { selectedScenario, updateScenario } = useContext(ScenarioContext)
  const { context } = selectedScenario
  const { auBank } = context
  const { control, handleSubmit } = useForm<ChangedFormData>({ defaultValues: { interestRate: auBank.interestRate } })

  const handleBack = () => {
    navigation.goBack()
  }

  const onSubmit = (data: ChangedFormData) => {
    const { interestRate } = data
    const { context } = selectedScenario

    const updatedContext: ContextData = {
      ...context,
      auBank: {
        interestRate: interestRate
      }
    }

    const updatedScenario = { ...selectedScenario, context: updatedContext }

    updateScenario(updatedScenario)
    navigation.goBack()
  }

  return (
    <EditPageLayout
      heading="Bank"
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
          id="interestRate"
          control={control}
          label={contextConstants.CASH_INTEREST_RATE.LABEL}
          defaultValue={auBank.interestRate}
          // validationRules={changeDetailsValidation}
          restrictedCharSet={DECIMALS_ONLY}
          helpText={contextConstants.CASH_INTEREST_RATE.HELP_TEXT}
        />
      </form>
    </EditPageLayout>
  )
}
