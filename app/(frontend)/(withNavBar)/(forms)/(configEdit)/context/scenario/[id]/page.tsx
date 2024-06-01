"use client"

import { useForm } from "react-hook-form"
import { useContext } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import EditPageLayout from "@/app/(frontend)/(withoutNavBar)/components/EditPageLayout"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"
import { ALPHA_NUMERIC } from "@/app/ui/components/common/formRegExes"
import { InputQuestion } from "@/app/ui/components/form/InputQuestion"
import { TextAreaQuestion } from "@/app/ui/components/form/TextAreaQuestion"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"

import { scenarioConstants } from "../scenarioConstants"

const FormSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3)
})
export type FormDataType = z.infer<typeof FormSchema>

export default function ScenarioPage({ params }: { params: { id: string } }) {
  const { id } = params
  const navigation = useNavigation()
  const { selectedScenario, updateScenario, addScenario } = useContext(ScenarioContext)
  const { name, description } = selectedScenario
  const defaultValues = id === "add" ? {} : { name, description }
  const { control, handleSubmit } = useForm<FormDataType>({
    defaultValues,
    resolver: zodResolver(FormSchema)
  })

  const handleBack = () => {
    navigation.goBack()
  }

  const onSubmit = async (data: FormDataType) => {
    const { name, description } = data

    if (id === "add") {
      const { success } = await addScenario(name, description)
      if (success) navigation.goBack()
    } else {
      const updatedScenario = { ...selectedScenario, name, description }

      const { success } = await updateScenario(updatedScenario)
      if (success) navigation.goBack()
    }
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
      {id === "add" && (
        <Alert heading="Note" alertType={AlertType.info}>
          The context, assets and transfers will be copied across from the existing scenario. They can then be changed
          by editing after saving.
        </Alert>
      )}

      <form>
        {/* @ts-ignore */}
        <InputQuestion
          id="name"
          control={control}
          label={scenarioConstants.NAME.LABEL}
          restrictedCharSet={ALPHA_NUMERIC}
          helpText={scenarioConstants.NAME.HELP_TEXT}
        />
        <TextAreaQuestion
          id="description"
          control={control}
          label={scenarioConstants.DESCRIPTION.LABEL}
          helpText={scenarioConstants.DESCRIPTION.HELP_TEXT}
        />
      </form>
    </EditPageLayout>
  )
}
