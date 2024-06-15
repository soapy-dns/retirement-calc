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
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"

import { scenarioConstants } from "../scenarioConstants"
import { IsFormNumber } from "@/app/lib/data/schema/config/schemaUtils"
import { useSearchParams } from "next/navigation"
import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"

// set years validation
const FormSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3)
  // asAtYear: IsFormNumber
})

export type FormDataType = z.infer<typeof FormSchema>

export default function ScenarioPage({ params }: { params: { id: string } }) {
  const { id } = params
  const navigation = useNavigation()
  const { selectedScenario, updateScenario, addScenario } = useContext(ScenarioContext)
  const searchParams = useSearchParams()

  const debug = searchParams.get("debug")

  const { name, description } = selectedScenario
  const defaultValues = id === "add" ? {} : { name, description }
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<FormDataType>({
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
      {id === "add" && selectedScenario.asAtYear < getCurrentYear() && (
        <div className="my-4">
          <Alert heading="Note" alertType={AlertType.info}>
            As you are copying a historical scenario, and historical scenarios are locked for changes, some aspects may
            be updated e.g. the &apos;As at date&apos;. Asset details will remain unchanged and these must be updated
            manually.
          </Alert>
        </div>
      )}

      {debug && errors && <pre>{JSON.stringify(errors, null, 4)}</pre>}

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
        {/* <InputQuestion
          id="asAtYear"
          control={control}
          label={scenarioConstants.AS_AT_YEAR.LABEL}
          restrictedCharSet={ALPHA_NUMERIC}
          helpText={scenarioConstants.AS_AT_YEAR.HELP_TEXT}
          disabled={true}
        /> */}
      </form>
    </EditPageLayout>
  )
}
