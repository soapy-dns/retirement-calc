"use client"

import { zodResolver } from "@hookform/resolvers/zod"

import EditPageLayout from "@/app/(frontend)/(withoutNavBar)/components/EditPageLayout"
import { ContextConfig } from "@/app/lib/data/schema/config"
import { DECIMALS_ONLY } from "@/app/ui/components/common/formRegExes"
import { InputQuestion } from "@/app/ui/components/form/InputQuestion"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { useContext, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { contextConstants } from "../contextConstants"
import { IsFormNumber } from "@/app/lib/data/schema/config/schemaUtils"
import { ChangesNotSavedModal } from "@/app/ui/components/modals/ChangesNotSavedModal"
import { z } from "zod"
import { useSearchParams } from "next/navigation"

const FormSchema = z.object({
  investmentReturn: IsFormNumber
})
type FormInputDataType = z.input<typeof FormSchema>
type FormOutputDataType = z.output<typeof FormSchema>

const SuperPage: React.FC = () => {
  const navigation = useNavigation()
  const searchParams = useSearchParams()

  const debug = searchParams.get("debug")

  const { selectedScenario, updateScenario } = useContext(ScenarioContext)
  const [showChangesNotSavedModal, setShowChangesNotSavedModal] = useState<boolean>(false)

  const { context } = selectedScenario
  const { superAu } = context
  const methods = useForm<FormInputDataType, any, FormOutputDataType>({
    defaultValues: {
      investmentReturn: Math.round(superAu?.investmentReturn * 10000) / 100
    },
    resolver: zodResolver(FormSchema)
  })
  const {
    handleSubmit,
    formState: { isDirty, errors }
  } = methods

  const handleBack = () => {
    if (isDirty) {
      setShowChangesNotSavedModal(true)
    } else {
      navigation.goBack()
    }
  }

  const onSubmit = async (data: FormOutputDataType) => {
    const { investmentReturn } = data
    const { context } = selectedScenario

    const updatedContext: ContextConfig = {
      ...context,
      superAu: {
        investmentReturn: investmentReturn / 100
      }
    }

    const updatedScenario = { ...selectedScenario, context: updatedContext }

    const { success } = await updateScenario(updatedScenario)
    if (success) navigation.goBack()
  }

  return (
    <FormProvider {...methods}>
      <EditPageLayout
        heading="Super"
        backText="Back to context"
        cancelText="Cancel"
        saveText="Save changes"
        handleSubmit={handleSubmit(onSubmit)}
        handleBack={handleBack}
        handleCancel={handleBack}
      >
        {debug && errors && <pre>{JSON.stringify(errors, null, 4)}</pre>}

        <form>
          {/* @ts-ignore */}
          <InputQuestion
            id="investmentReturn"
            label={contextConstants.SUPER_INVESTMENT_RETURN.LABEL}
            defaultValue={superAu?.investmentReturn}
            editable={true}
            restrictedCharSet={DECIMALS_ONLY}
            helpText={contextConstants.SUPER_INVESTMENT_RETURN.HELP_TEXT}
          />
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

export default SuperPage
