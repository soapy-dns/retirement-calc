"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

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

const FormSchema = z.object({
  interestRate: IsFormNumber
})
export type FormDataType = z.infer<typeof FormSchema>

const BankPage: React.FC = () => {
  const navigation = useNavigation()
  const [showModal, setShowModal] = useState<boolean>(false)
  const { selectedScenario, updateScenario } = useContext(ScenarioContext)
  const { context } = selectedScenario
  const { auBank } = context
  const methods = useForm<FormDataType>({
    defaultValues: { interestRate: Math.round(auBank.interestRate * 10000) / 100 },
    resolver: zodResolver(FormSchema)
  })
  const {
    control,
    handleSubmit,
    formState: { isDirty }
  } = methods

  const handleBack = () => {
    if (isDirty) {
      // pop modal
      setShowModal(true)
    } else {
      navigation.goBack()
    }
  }

  const onSubmit = async (data: FormDataType) => {
    const { interestRate } = data
    const { context } = selectedScenario

    const updatedContext: ContextConfig = {
      ...context,
      auBank: {
        interestRate: interestRate / 100
      }
    }

    const updatedScenario = { ...selectedScenario, context: updatedContext }

    const { success } = await updateScenario(updatedScenario)
    if (success) navigation.goBack()
  }

  return (
    <>
      <FormProvider {...methods}>
        <EditPageLayout
          heading="Cash"
          backText="Back to context"
          cancelText="Cancel"
          saveText="Save changes"
          handleSubmit={handleSubmit(onSubmit)}
          handleBack={handleBack}
          handleCancel={handleBack}
        >
          <form>
            {/* @ts-ignore */}
            <InputQuestion
              id="interestRate"
              // control={control}
              label={contextConstants.CASH_INTEREST_RATE.LABEL}
              defaultValue={auBank.interestRate}
              restrictedCharSet={DECIMALS_ONLY}
              helpText={contextConstants.CASH_INTEREST_RATE.HELP_TEXT}
            />
          </form>
          <ChangesNotSavedModal
            showModal={showModal}
            handleCancel={() => setShowModal(false)}
            continueAnyway={() => navigation.goBack()}
          />
        </EditPageLayout>
      </FormProvider>
    </>
  )
}

export default BankPage
