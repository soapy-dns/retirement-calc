"use client"

import React, { useContext, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline"
import { zodResolver } from "@hookform/resolvers/zod"

import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { ContextConfig } from "@/app/lib/data/schema/config"
import { InputField } from "@/app/ui/components/form/InputField"
import { DECIMALS_ONLY, INTEGERS_ONLY } from "@/app/ui/components/common/formRegExes"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { ValidationError } from "@/app/ui/components/common/ValidationError"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import EditPageLayout from "@/app/(frontend)/(withoutNavBar)/components/EditPageLayout"
import { GenericModal } from "@/app/ui/components/modals/GenericModal"
import { YearValueForm } from "@/app/ui/components/YearValueForm"
import { HelpModalContext } from "@/app/ui/context/HelpModalProvider"
import { contextConstants } from "../contextConstants"
import { FormDataType, getFormSchema } from "./inflationFormSchema"
import { ChangesNotSavedModal } from "@/app/ui/components/modals/ChangesNotSavedModal"

const InflationEditPage: React.FC = () => {
  const navigation = useNavigation()
  const { showModal, onToggle } = useContext(HelpModalContext)
  const [showChangesNotSavedModal, setShowChangesNotSavedModal] = useState<boolean>(false)
  const { selectedScenario, updateScenario } = useContext(ScenarioContext)
  const { context } = selectedScenario
  const { inflation } = context

  const inflationWithPerc = inflation.map((it) => ({
    fromYear: +it.fromYear,
    inflationRate: Math.round(it.inflationRate * 10000) / 100
  }))

  const {
    // watch,
    trigger,
    getValues,
    setValue,
    handleSubmit,
    control,
    // reset,
    formState: { isDirty, errors }
    // clearErrors
  } = useForm<FormDataType>({
    defaultValues: { items: inflationWithPerc },
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(getFormSchema(selectedScenario))
  })

  const { fields, insert, remove } = useFieldArray({
    control,
    name: "items"
  })

  const handleDelete = (index: number) => {
    remove(index)
  }

  const handleAdd = (fromYear: number, inflationRate: number) => {
    if (!fromYear || !inflationRate) return null // This stops us from adding a new row with nothing in it could also null the button
    const newRecord = { fromYear, inflationRate }

    let insertIndex = 0
    const findIndex = fields.findIndex((it) => it.fromYear > fromYear)

    if (findIndex === -1) {
      insertIndex = fields.length
    } else {
      insertIndex = findIndex
    }

    insert(insertIndex, newRecord)

    onToggle() // This closes in this situation.  I think we could improve this
  }

  const onSubmit = async (data: FormDataType) => {
    const { context } = selectedScenario

    const reformattedDataItems = data.items.map((it) => {
      return {
        fromYear: it.fromYear,
        inflationRate: it.inflationRate / 100
      }
    })

    const updatedContext: ContextConfig = {
      ...context,
      inflation: reformattedDataItems
    }

    const updatedScenario = { ...selectedScenario, context: updatedContext }

    const { success } = await updateScenario(updatedScenario)
    if (success) navigation.goBack()
  }

  const handleBack = () => {
    if (isDirty) {
      setShowChangesNotSavedModal(true)
    } else {
      navigation.goBack()
    }
  }

  const removeDisabled = fields.length < 2

  return (
    <EditPageLayout
      heading={"Edit estimated inflation values"}
      backText="Back to main context"
      cancelText="Cancel"
      saveText="Save changes"
      handleSubmit={handleSubmit(onSubmit)}
      handleBack={handleBack}
      handleCancel={handleBack}
    >
      {/* {errors && <pre>{JSON.stringify(errors, null, 4)}</pre>} */}

      <form>
        <>
          <div className="flex justify-center mb-4">
            <Button buttonType={ButtonType.secondary} onClick={onToggle}>
              <div className="flex gap-2 items-center justify-center">
                <PlusCircleIcon className="h-6 w-6" />
                <div>Add a new row</div>
              </div>
            </Button>
          </div>

          <div className="grid grid-cols-3  gap-2">
            <div className="font-bold">From year</div>
            <div className="font-bold">Inflation (%)</div>
            <div></div>
          </div>

          {fields.map((it, index) => {
            return (
              <div key={it.fromYear} className="grid grid-cols-3 justify-items-center gap-2">
                {/* @ts-ignore */}
                <InputField
                  id={`items.${index}.fromYear`}
                  control={control}
                  defaultValue={it.fromYear}
                  // validationRules={inflationYearValidationRules}
                  restrictedCharSet={INTEGERS_ONLY}
                  // type="number"
                />

                <InputField
                  id={`items.${index}.inflationRate`}
                  control={control}
                  defaultValue={it.inflationRate}
                  // validationRules={inflationRateValidationRules}
                  restrictedCharSet={DECIMALS_ONLY}
                  type="number"
                />
                <div>
                  <Button onClick={() => handleDelete(index)} disabled={removeDisabled}>
                    <div className="flex items-center gap-2">
                      <TrashIcon className="h-6 w-6" />
                      <div className={`hidden md:flex`}>Remove</div>
                    </div>
                  </Button>
                </div>

                {errors?.items?.[index]?.fromYear && (
                  <div className="col-span-3 justify-self-start">
                    <ValidationError
                      id={`items.${index}.fromYear_error`}
                      errorMsg={errors?.items?.[index]?.fromYear?.message || ""}
                    />
                  </div>
                )}
                {errors?.items?.[index]?.inflationRate && (
                  <div className="col-span-3 justify-self-start">
                    <ValidationError
                      id={`items.${index}.inflationRate_error`}
                      errorMsg={errors?.items?.[index]?.inflationRate?.message || ""}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </>
      </form>

      <GenericModal showModal={showModal} heading="Add inflation row" handleCancel={onToggle}>
        <YearValueForm
          handleCancel={onToggle}
          handleAdd={handleAdd}
          valueLabel={contextConstants.RATE.LABEL}
          valueHelpText={contextConstants.RATE.HELP_TEXT}
        />
      </GenericModal>

      <ChangesNotSavedModal
        showModal={showChangesNotSavedModal}
        handleCancel={() => setShowChangesNotSavedModal(false)}
        continueAnyway={() => navigation.goBack()}
      />
    </EditPageLayout>
  )
}

export default InflationEditPage
