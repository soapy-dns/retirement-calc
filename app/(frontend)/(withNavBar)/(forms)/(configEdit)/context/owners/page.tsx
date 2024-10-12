"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import EditPageLayout from "@/app/(frontend)/(withoutNavBar)/components/EditPageLayout"
import { ContextConfig } from "@/app/lib/data/schema/config"
import { INTEGERS_ONLY } from "@/app/ui/components/common/formRegExes"
import { InputQuestion } from "@/app/ui/components/form/InputQuestion"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { useContext, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"

import { contextConstants } from "../contextConstants"
import { IsFormNumberOpt } from "@/app/lib/data/schema/config/schemaUtils"
import { ChangesNotSavedModal } from "@/app/ui/components/modals/ChangesNotSavedModal"
import { RadioButtonQuestion, RadioQuestionVariant } from "@/app/ui/components/form/RadioButtonQuestion"
import { Alert, AlertType } from "@/app/ui/components/alert/Alert"
import { genderOptions } from "@/app/lib/utils/genderOptions"
import { Card } from "@/app/ui/components/Card"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { PlusCircleIcon, Trash2Icon } from "lucide-react"
import { getRandomKey } from "@/app/lib/utils/getRandomKey"
import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"
import { useAssets } from "@/app/ui/hooks/useAssets"
import { GenericModal } from "@/app/ui/components/modals/GenericModal"
import format from "date-fns/format"

const invalidYearMsg = `The year of birth must be >= 21 years and <= 100 years from this year`

const FormSchema = z.object({
  items: z.array(
    z
      .object({
        identifier: z.string(),
        ownerName: z.string(),
        birthYear: IsFormNumberOpt,
        gender: z.enum(["M", "F"]).optional()
      })
      .refine(
        ({ birthYear }) => {
          const nowYear = Number(format(Date.now(), "yyyy"))

          if (!birthYear) return true

          if (birthYear <= nowYear - 100 || birthYear >= nowYear - 21) return false
          return true
        },
        { message: invalidYearMsg, path: ["birthYear"] }
      )
  )
})
export type FormDataType = z.infer<typeof FormSchema>

const OwnersPage: React.FC = () => {
  const navigation = useNavigation()
  const { selectedScenario, updateScenario } = useContext(ScenarioContext)
  const [showChangesNotSavedModal, setShowChangesNotSavedModal] = useState<boolean>(false)
  const [showInvalidActionModal, setShowInvalidActionModal] = useState<boolean>(false)
  const { ownerIsInUse } = useAssets()

  const { context } = selectedScenario
  const { owners } = context
  const {
    handleSubmit,
    control,
    register,
    formState: { isDirty, errors }
  } = useForm<FormDataType>({
    defaultValues: { items: owners },
    resolver: zodResolver(FormSchema),
    mode: "onBlur",
    reValidateMode: "onBlur"
  })

  const { fields, insert, remove } = useFieldArray({
    control,
    name: "items"
  })

  const handleBack = () => {
    if (isDirty) {
      setShowChangesNotSavedModal(true)
    } else {
      navigation.goBack()
    }
  }

  const onSubmit = async (data: FormDataType) => {
    console.log("data", data)
    const reformattedDataItems = data.items.map((it) => {
      return {
        identifier: it.identifier || getRandomKey(),
        ownerName: it.ownerName,
        birthYear: it.birthYear ? Number(it.birthYear) : undefined,
        gender: it.gender
      }
    })

    const { context } = selectedScenario

    const updatedContext: ContextConfig = {
      ...context,
      owners: reformattedDataItems
    }

    const updatedScenario = { ...selectedScenario, context: updatedContext }

    const { success } = await updateScenario(updatedScenario)
    if (success) navigation.goBack()
  }

  const handleDelete = (ownerId: string) => {
    // first need to check there are no assets with this owner
    const ownerUsedByAsset = ownerIsInUse(ownerId)

    if (!ownerUsedByAsset) {
      const index = owners.findIndex((it) => it.identifier === ownerId)
      return remove(index)
      return
    }

    setShowInvalidActionModal(true)
  }
  const handleAdd = () => {
    insert(1, { identifier: getRandomKey(), ownerName: "Person" })
  }

  return (
    <EditPageLayout
      heading="Asset owners"
      backText="Back to context"
      cancelText="Cancel"
      saveText="Save changes"
      handleSubmit={handleSubmit(onSubmit)}
      handleBack={handleBack}
      handleCancel={handleBack}
    >
      <div className="mb-4">
        <Alert alertType={AlertType.info} heading="Note:">
          <>
            <p>Owners need to be added to correctly calculate taxes for each. There is a maximum of 2 owners.</p>
            <p>
              Only a name is necessary for each. Other details can help make the calculations more accurate, and help
              indicate if your assets are likely to match your expected lifespan, and improve tax calculations.
            </p>
          </>
        </Alert>
      </div>

      <form>
        {fields.map((it, index) => {
          return (
            <Card key={it.id}>
              <div className="flex justify-between items-start">
                <h2 className="text-primary-foreground ">Person {index + 1}</h2>

                {fields.length === 2 && (
                  <Button onClick={() => handleDelete(it.identifier)} buttonType={ButtonType.tertiary}>
                    <div className="flex items-center gap-2">
                      <Trash2Icon className="h-5 w-5" />
                    </div>
                  </Button>
                )}
              </div>

              <input
                type="hidden"
                className="w-full text-secondary-foreground border-2 border-blue-300"
                id={`items.${index}.identifier`}
                {...register(`items.${index}.identifier`)}
              />

              {/* @ts-ignore */}
              <InputQuestion
                id={`items.${index}.ownerName`}
                control={control}
                label={contextConstants.OWNER_IDENTIFIER.LABEL}
                editable={true}
                helpText={contextConstants.OWNER_IDENTIFIER.HELP_TEXT}
              />

              <RadioButtonQuestion
                id={`items.${index}.gender`}
                label={contextConstants.OWNER_GENDER.LABEL}
                control={control}
                values={genderOptions}
                variant={RadioQuestionVariant.BLOCK}
                helpText={contextConstants.OWNER_GENDER.HELP_TEXT}
              />

              <InputQuestion
                id={`items.${index}.birthYear`}
                control={control}
                label={contextConstants.OWNER_BIRTH_YEAR.LABEL}
                editable={true}
                restrictedCharSet={INTEGERS_ONLY}
                helpText={contextConstants.OWNER_BIRTH_YEAR.HELP_TEXT}
              />
            </Card>
          )
        })}
      </form>

      {fields.length === 1 && (
        <div className="mx-auto sm:w-3/4 flex justify-center mb-4">
          <Button buttonType={ButtonType.tertiary} onClick={handleAdd}>
            <div className="flex gap-2 items-center justify-center">
              <PlusCircleIcon className="h-6 w-6" />
              <div>Add another person</div>
            </div>
          </Button>
        </div>
      )}

      <ChangesNotSavedModal
        showModal={showChangesNotSavedModal}
        handleCancel={() => setShowChangesNotSavedModal(false)}
        continueAnyway={() => navigation.goBack()}
      />

      <GenericModal
        showModal={showInvalidActionModal}
        heading="Invalid action."
        handleCancel={() => {
          setShowInvalidActionModal(false)
        }}
      >
        This person still own assets. You will need to update the assets before you can remove this owner from the
        context.
      </GenericModal>
    </EditPageLayout>
  )
}

export default OwnersPage
