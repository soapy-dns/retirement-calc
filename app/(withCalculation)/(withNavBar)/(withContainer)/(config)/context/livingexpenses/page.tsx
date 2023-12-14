"use client"

import React, { useContext } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { ContextData, LivingExpensesRecord } from "@/app/lib/data/types"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import { InputField } from "@/app/ui/components/form/InputField"
import { inflationYearValidationRules, newInflationRateValidationRules } from "@/app/ui/validation/inflationYear"
import { DECIMALS_ONLY, INTEGERS_ONLY } from "@/app/ui/components/common/formRegExes"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { ValidationError } from "@/app/ui/components/common/ValidationError"
import EditPageLayout from "@/app/(withCalculation)/(withoutNavBar)/components/EditPageLayout"

const amountInTodaysTermsAddId = "amountInTodaysTermsAdd"
const yearAddId = "yearAdd"

interface ChangedFormData {
  items: LivingExpensesRecord[]
  [amountInTodaysTermsAddId]: number
  [yearAddId]: number
}

const LivingExpensesPage: React.FC = () => {
  const navigation = useNavigation()

  const { selectedScenario, updateScenario } = useContext(ScenarioContext)
  const { context } = selectedScenario
  const { livingExpenses } = context

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
  } = useForm<ChangedFormData>({ defaultValues: { items: livingExpenses } })

  const { fields, insert, remove } = useFieldArray({
    control,
    name: "items"
  })

  const handleDelete = (index: number) => {
    remove(index)
  }

  const handleAdd = async () => {
    const valid = await trigger([yearAddId])
    if (valid) {
      const values = getValues()
      const fromYear = +values[yearAddId]
      const amountInTodaysTerms = +values[amountInTodaysTermsAddId]
      if (!fromYear || !amountInTodaysTerms) return null // This stops us from adding a new row with nothing in it could also null the button
      const newRecord = { fromYear, amountInTodaysTerms }

      let insertIndex = 0
      const findIndex = fields.findIndex((it) => it.fromYear > fromYear)

      if (findIndex === -1) {
        insertIndex = fields.length
      } else {
        insertIndex = findIndex - 1
      }

      // TODO: if value already found??

      insert(insertIndex, newRecord)

      // @ts-ignore
      setValue(yearAddId, "")
      // @ts-ignore
      setValue(amountInTodaysTermsAddId, "")
    }
  }

  const onSubmit = (data: ChangedFormData) => {
    const { context } = selectedScenario

    const reformattedDataItems = data.items.map((it) => {
      return {
        fromYear: Number(it.fromYear),
        amountInTodaysTerms: Number(it.amountInTodaysTerms)
      }
    })

    const updatedContext: ContextData = {
      ...context,
      livingExpenses: reformattedDataItems
    }

    const updatedScenario = { ...selectedScenario, context: updatedContext }

    updateScenario(updatedScenario)
    navigation.goBack()
  }

  const handleBack = () => {
    navigation.goBack()
  }

  const getError = (fieldId: string) => {
    return errors[fieldId]
  }

  return (
    <EditPageLayout
      heading={"Edit tax and currency details"}
      backText="Back to main context"
      cancelText="Cancel and return to context"
      saveText="Save changes"
      handleSubmit={handleSubmit(onSubmit)}
      handleBack={handleBack}
      handleCancel={handleBack}
    >
      <form>
        <>
          <div className="grid grid-cols-3 justify-items-center gap-2">
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
                  // defaultValue={it.fromYear}
                  validationRules={inflationYearValidationRules}
                  restrictedCharSet={INTEGERS_ONLY}
                  type="number"
                />
                <InputField
                  id={`items.${index}.amountInTodaysTerms`}
                  control={control}
                  // validationRules={inflationRateValidationRules}
                  restrictedCharSet={DECIMALS_ONLY}
                  type="number"
                />
                <div>
                  <Button onClick={() => handleDelete(index)}>
                    <div className="flex items-center gap-2">
                      <TrashIcon className="h-4 w-4" />
                      <div className="invisible md:visible">Remove</div>
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
        </>

        <div className="mt-4 grid grid-cols-3 justify-items-center gap-2">
          <InputField
            id={yearAddId}
            control={control}
            // validationRules={newInflationYearValidationRules}
            restrictedCharSet={INTEGERS_ONLY}
          />

          <InputField
            id={amountInTodaysTermsAddId}
            control={control}
            validationRules={newInflationRateValidationRules}
            restrictedCharSet={DECIMALS_ONLY}
          />

          <Button buttonType={ButtonType.tertiary} onClick={handleAdd}>
            <div className="flex items-center gap-2">
              <PlusCircleIcon className="h-4 w-4" />
              Add
            </div>
          </Button>
          {getError(yearAddId) && (
            <div className="col-span-3">
              <ValidationError id={`${yearAddId}_error`} errorMsg={getError(yearAddId).message} />
            </div>
          )}
          {getError(amountInTodaysTermsAddId) && (
            <div className="col-span-3">
              <ValidationError
                id={`${amountInTodaysTermsAddId}_error`}
                errorMsg={getError(amountInTodaysTermsAddId).message}
              />
            </div>
          )}
        </div>
      </form>
    </EditPageLayout>
  )
}

export default LivingExpensesPage
