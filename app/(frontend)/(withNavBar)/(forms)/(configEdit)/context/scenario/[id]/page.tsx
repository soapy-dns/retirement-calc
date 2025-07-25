"use client"

import { FormProvider, useForm } from "react-hook-form"
import { useContext, use, useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import EditPageLayout from "@/app/(frontend)/(withoutNavBar)/components/EditPageLayout"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"
import { ALPHA_NUMERIC } from "@/app/ui/components/common/formRegExes"
import { InputQuestion } from "@/app/ui/components/form/InputQuestion"
import { TextAreaQuestion } from "@/app/ui/components/form/TextAreaQuestion"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { StressTestEnum, StressTest, Country } from "@/app/lib/data/schema/config"
// import { AssetClass, CashAsset, Country, IAsset, LiquidAsset, StressTest } from "../../data/schema/config"

import { scenarioConstants } from "../scenarioConstants"
import { useSearchParams } from "next/navigation"
import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"
import { StressTestEdit } from "../StressTestEdit"
import { ChangesNotSavedModal } from "@/app/ui/components/modals/ChangesNotSavedModal"

// set years validation
const FormSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
  stressTest: StressTestEnum
})
// assetCountry: Country = "AU",

export type FormDataType = z.infer<typeof FormSchema>

type Params = Promise<{ id: string }>

export default function ScenarioPage(props: { params: Params }) {
  const params = use(props.params)
  const [showChangesNotSavedModal, setShowChangesNotSavedModal] = useState<boolean>(false)

  const { id } = params
  const navigation = useNavigation()
  const { selectedScenario, updateScenario, addScenario } = useContext(ScenarioContext)
  const searchParams = useSearchParams()

  const debug = searchParams.get("debug")

  const defaultStressTest = "NONE"
  const { name, description, stressTest } = selectedScenario
  const defaultValues = id === "add" ? { stressTest: defaultStressTest } : { name, description, stressTest }
  const methods = useForm<FormDataType>({
    // @ts-ignore - how do I fix this TODO:
    defaultValues,
    resolver: zodResolver(FormSchema)
  })
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isDirty }
  } = methods

  const handleBack = () => {
    if (isDirty) {
      setShowChangesNotSavedModal(true)
    } else {
      navigation.goBack()
    }
  }

  const onSubmit = async (data: FormDataType) => {
    const { name, description, stressTest } = data

    if (id === "add") {
      const { success } = await addScenario(name, description, stressTest)
      if (success) navigation.goBack()
    } else {
      const updatedScenario = { ...selectedScenario, name, description, stressTest }

      const { success } = await updateScenario(updatedScenario)
      if (success) navigation.goBack()
    }
  }

  return (
    <FormProvider {...methods}>
      <EditPageLayout
        heading="Scenario Edit"
        backText="Back to config"
        cancelText="Cancel"
        saveText="Save changes"
        // @ts-ignore  FIXME: dirty hack
        handleSubmit={handleSubmit(onSubmit)}
        handleBack={handleBack}
        handleCancel={handleBack}
      >
        {id === "add" && (
          <Alert heading="Note" alertType={AlertType.INFO}>
            The context, assets and transfers will be copied across from the existing scenario. They can then be changed
            by editing after saving.
          </Alert>
        )}
        {id === "add" && selectedScenario.asAtYear < getCurrentYear() && (
          <div className="my-4">
            <Alert heading="Note" alertType={AlertType.INFO}>
              As you are copying a historical scenario, and historical scenarios are locked for changes, some aspects
              may be updated e.g. the &apos;As at date&apos;. Asset details will remain unchanged and these must be
              updated manually.
            </Alert>
          </div>
        )}

        {debug && errors && <pre>{JSON.stringify(errors, null, 4)}</pre>}

        <form>
          {/* @ts-ignore */}
          <InputQuestion
            id="name"
            // control={control}
            label={scenarioConstants.NAME.LABEL}
            restrictedCharSet={ALPHA_NUMERIC}
            helpText={scenarioConstants.NAME.HELP_TEXT}
          />
          <TextAreaQuestion
            id="description"
            // control={control}
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
          <StressTestEdit watch={watch} />
        </form>

        <ChangesNotSavedModal
          showModal={showChangesNotSavedModal}
          handleCancel={() => setShowChangesNotSavedModal(false)}
          continueAnyway={() => navigation.goBack()}
        />
      </EditPageLayout>
    </FormProvider>
  )
}
