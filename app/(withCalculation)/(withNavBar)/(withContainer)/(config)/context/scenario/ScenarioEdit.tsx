import EditPageLayout from "@/app/(withCalculation)/(withoutNavBar)/components/EditPageLayout"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"
import { ALPHA_ONLY } from "@/app/ui/components/common/formRegExes"
import { InputQuestion } from "@/app/ui/components/form/InputQuestion"
import { TextAreaQuestion } from "@/app/ui/components/form/TextAreaQuestion"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useContext } from "react"

import { useForm } from "react-hook-form"

import { scenarioConstants } from "./scenarioConstants"

interface ChangedFormData {
  name: string
  description: string
}

export const ScenarioEditPage: React.FC = () => {
  let { action } = useParams()

  const navigation = useNavigation()
  const { selectedScenario, updateScenario, addScenario } = useContext(ScenarioContext)
  const { name, description } = selectedScenario
  const defaultValues = action === "edit" ? { name, description } : {}
  const { control, handleSubmit } = useForm<ChangedFormData>({
    defaultValues
  })

  const handleBack = () => {
    navigation.goBack()
  }

  const onSubmit = (data: ChangedFormData) => {
    const { name, description } = data

    if (action.add) {
      addScenario(name, description)
    } else {
      const updatedScenario = { ...selectedScenario, name, description }

      updateScenario(updatedScenario)
    }

    console.log("now go back")
    navigation.goBack()
  }

  return (
    <EditPageLayout
      heading="Scenario Edit"
      backText="Back to config"
      cancelText="Cancel and return to config"
      saveText="Save changes"
      handleSubmit={handleSubmit(onSubmit)}
      handleBack={handleBack}
      handleCancel={handleBack}
    >
      {action === "add" && (
        <Alert heading="Note" alertType={AlertType.info}>
          The context, assets and transfers will be copied across as is. They can only be changed by editing after
          saving.
        </Alert>
      )}

      <form>
        {/* @ts-ignore */}
        <InputQuestion
          id="name"
          control={control}
          label={scenarioConstants.NAME.LABEL}
          // validationRules={changeDetailsValidation}
          restrictedCharSet={ALPHA_ONLY}
          helpText={scenarioConstants.NAME.HELP_TEXT}
        />
        <TextAreaQuestion
          id="description"
          control={control}
          label={scenarioConstants.DESCRIPTION.LABEL}
          // validationRules={changeDetailsValidation}
          //   restrictedCharSet={ALPHA_ONLY}
          helpText={scenarioConstants.DESCRIPTION.HELP_TEXT}
        />
      </form>
    </EditPageLayout>
  )
}
