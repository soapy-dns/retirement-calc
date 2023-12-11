import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { useContext } from "react"
import { useForm } from "react-hook-form"

// import { ScenarioContext } from "view/context/ScenarioContext"
// import { EditPageLayout } from "view/layouts/EditPageLayout"
// import { CheckboxQuestion } from "view/components/CheckboxQuestion"
// import { fileConstants } from "./filesConstants"
// import { useNavigation } from "view/hooks/useNavigation"
// import { InputQuestion } from "view/components/InputQuestion"

interface ChangedFormData {
  scenariosSelected: string[]
  fileName: string
}

export default () => {
  const { scenarios, scenarioOptions = [] } = useContext(ScenarioContext)

  const navigation = useNavigation()

  const { handleSubmit, control, register } = useForm<ChangedFormData>({
    defaultValues: {}
  })

  const handleBack = () => {
    navigation.goBack()
  }

  const saveFile = (data: ChangedFormData) => {
    const { scenariosSelected, fileName } = data

    const filteredScenarios = scenarios?.filter((it) => scenariosSelected.includes(it.id))
    const text = JSON.stringify(filteredScenarios, null, 4)
    const blob = new Blob([text], { type: "application/json" })

    const element = document.createElement("a")

    element.href = URL.createObjectURL(blob)
    element.download = `${fileName}.json` || "scenarios.json"

    element.click()

    navigation.goBack()
  }

  return (
    <EditPageLayout
      heading={"Export your configured scenarios"}
      backText="Back"
      cancelText="Cancel"
      saveText="Save scenarios"
      handleSubmit={handleSubmit(saveFile)}
      handleBack={handleBack}
      handleCancel={handleBack}
    >
      <form>
        <CheckboxQuestion
          id="scenarios"
          control={control}
          label={fileConstants.SCENARIOS.LABEL}
          helpText={fileConstants.SCENARIOS.HELP_TEXT}
          options={scenarioOptions}
          {...register("scenariosSelected")}
        />

        <InputQuestion
          id="fileName"
          control={control}
          label={fileConstants.FILE_NAME.LABEL}
          helpText={fileConstants.FILE_NAME.HELP_TEXT}
          // {...register("scenariosSelected")}
        />
      </form>
    </EditPageLayout>
  )
}
