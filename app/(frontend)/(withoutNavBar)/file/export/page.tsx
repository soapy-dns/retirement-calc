"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CheckboxQuestion } from "@/app/ui/components/form/CheckboxQuestion"
import { InputQuestion } from "@/app/ui/components/form/InputQuestion"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import EditPageLayout from "../../components/EditPageLayout"
import { fileConstants } from "../filesConstants"

const FormSchema = z.object({
  scenariosSelected: z.array(z.string()).min(1, "You must select at least one scenario"),
  fileName: z.string({ required_error: "Please include a file name." })
})
export type FormDataType = z.infer<typeof FormSchema>

export default function Export() {
  const { scenarios, scenarioOptions = [] } = useContext(ScenarioContext)

  const navigation = useNavigation()

  const { handleSubmit, control, register } = useForm<FormDataType>({
    defaultValues: { scenariosSelected: [] },
    resolver: zodResolver(FormSchema)
  })

  const handleBack = () => {
    navigation.goBack()
  }

  const saveFile = (data: FormDataType) => {
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
        {/*  @ts-ignore  */}
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
