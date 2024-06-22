"use client"

import React, { useContext, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { ContextConfig } from "@/app/lib/data/schema/config"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { InputField } from "@/app/ui/components/form/InputField"
import { DECIMALS_ONLY, INTEGERS_ONLY } from "@/app/ui/components/common/formRegExes"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { ValidationError } from "@/app/ui/components/common/ValidationError"
import EditPageLayout from "@/app/(frontend)/(withoutNavBar)/components/EditPageLayout"
import { YearValueForm } from "@/app/ui/components/YearValueForm"
import { GenericModal } from "@/app/ui/components/modals/GenericModal"
import { HelpModalContext } from "@/app/ui/context/HelpModalProvider"
import { contextConstants } from "../contextConstants"
import { FormDataType, getFormSchema } from "./types"
import { ChangesNotSavedModal } from "@/app/ui/components/modals/ChangesNotSavedModal"

const LivingExpensesPage: React.FC = () => {
  const navigation = useNavigation()

  const { selectedScenario, updateScenario } = useContext(ScenarioContext)
  const { showModal, onToggle } = useContext(HelpModalContext)
  const [showChangesNotSavedModal, setShowChangesNotSavedModal] = useState<boolean>(false)

  const { context } = selectedScenario
  const { livingExpenses } = context

  const {
    handleSubmit,
    control,
    formState: { isDirty, errors }
  } = useForm<FormDataType>({
    defaultValues: { items: livingExpenses },
    resolver: zodResolver(getFormSchema(selectedScenario)),
    mode: "onBlur",
    reValidateMode: "onBlur"
  })

  const { fields, insert, remove } = useFieldArray({
    control,
    name: "items"
  })

  const handleDelete = (index: number) => {
    remove(index)
  }

  const handleAdd = (fromYear: number, amountInTodaysTerms: number) => {
    if (!fromYear || !amountInTodaysTerms) return null // This stops us from adding a new row with nothing in it could also null the button
    const newRecord = { fromYear, amountInTodaysTerms }

    let insertIndex = 0
    const findIndex = fields.findIndex((it) => it.fromYear > fromYear)

    if (findIndex === -1) {
      insertIndex = fields.length
    } else {
      insertIndex = findIndex
    }

    // TODO: if value already found??

    insert(insertIndex, newRecord)

    onToggle() // This closes in this situation.  I think we could improve this
  }

  const onSubmit = async (data: FormDataType) => {
    const { context } = selectedScenario

    const reformattedDataItems = data.items.map((it) => {
      return {
        fromYear: Number(it.fromYear),
        amountInTodaysTerms: Number(it.amountInTodaysTerms)
      }
    })

    const updatedContext: ContextConfig = {
      ...context,
      livingExpenses: reformattedDataItems
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
      heading={"Edit estimated living expenses"}
      backText="Back to main context"
      cancelText="Cancel and return to context"
      saveText="Save changes"
      handleSubmit={handleSubmit(onSubmit)}
      handleBack={handleBack}
      handleCancel={handleBack}
    >
      <>
        <div className="flex justify-center mb-4">
          <Button buttonType={ButtonType.secondary} onClick={onToggle}>
            <div className="flex gap-2 items-center justify-center">
              <PlusCircleIcon className="h-6 w-6" />
              <div>Add a new row</div>
            </div>
          </Button>
        </div>

        <form className="mb-4">
          <div className="grid grid-cols-3 gap-2">
            <div className="font-bold">From year</div>
            <div className="font-bold">Value at today&apos;s date</div>
            <div></div>
          </div>

          {fields.map((it, index) => {
            return (
              <div key={it.fromYear} className="grid grid-cols-3 justify-items-center gap-2">
                {/* @ts-ignore */}
                <InputField
                  id={`items.${index}.fromYear`}
                  control={control}
                  placeholder="Add a year"
                  restrictedCharSet={INTEGERS_ONLY}
                  type="number"
                />
                <InputField
                  id={`items.${index}.amountInTodaysTerms`}
                  control={control}
                  placeholder="Add an amount"
                  restrictedCharSet={DECIMALS_ONLY}
                  type="number"
                />
                <div>
                  <Button onClick={() => handleDelete(index)} disabled={removeDisabled}>
                    <div className="flex items-center gap-2">
                      <TrashIcon className="h-6 w-6" />
                      <div className="hidden md:flex ">Remove</div>
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
                {errors?.items?.[index]?.amountInTodaysTerms && (
                  <div className="col-span-3 justify-self-start">
                    <ValidationError
                      id={`items.${index}.amountInTodaysTerms_error`}
                      errorMsg={errors?.items?.[index]?.amountInTodaysTerms?.message || ""}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </form>
      </>

      <GenericModal showModal={showModal} heading="Add living expenses row" handleCancel={onToggle}>
        <YearValueForm
          handleCancel={onToggle}
          handleAdd={handleAdd}
          valueLabel={contextConstants.LIVING_EXPENSES.LABEL}
          valueHelpText={contextConstants.LIVING_EXPENSES.HELP_TEXT}
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

export default LivingExpensesPage
