"use client"

import React, { MouseEvent, SyntheticEvent, useContext, useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline"
import { ScenarioContext } from "@/app/ui/context/ScenarioContext"
import { ContextConfig, InflationRecord } from "@/app/lib/data/types"
import { InputField } from "@/app/ui/components/form/InputField"
import {
  inflationRateValidationRules,
  inflationYearValidationRules,
  newInflationRateValidationRules,
  newInflationYearValidationRules
} from "@/app/ui/validation/inflationYear"
import { DECIMALS_ONLY, INTEGERS_ONLY } from "@/app/ui/components/common/formRegExes"
import { Button, ButtonType } from "@/app/ui/components/common/Button"
import { ValidationError } from "@/app/ui/components/common/ValidationError"
import { useNavigation } from "@/app/ui/hooks/useNavigation"
import EditPageLayout from "@/app/(withCalculation)/(withoutNavBar)/components/EditPageLayout"
import { useError } from "@/app/ui/hooks/useError"

const inflationAddId = "inflationAdd"
const yearAddId = "yearAdd"

// const sortInflationState = (inflationState) => {
//   inflationState.sort((a, b) => {
//     const aYear = a.fromYear
//     const bYear = b.fromYear
//     if (aYear > bYear) return 1
//     if (aYear < bYear) return -1
//     return 0
//   })

//   return inflationState
// }

interface ChangedFormData {
  items: InflationRecord[]
  [inflationAddId]: number
  [yearAddId]: number
}

// const marshall = (formData: ChangedFormData) => {}

const InflationEditPage: React.FC = () => {
  const navigation = useNavigation()

  const { selectedScenario, updateScenario } = useContext(ScenarioContext)
  const { context } = selectedScenario
  const { inflation } = context

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
  } = useForm<ChangedFormData>({ defaultValues: { items: inflation } })

  const { fields, insert, remove } = useFieldArray({
    control,
    name: "items"
  })

  const handleDelete = (index: number) => {
    remove(index)
  }

  const handleAdd = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const valid = await trigger([yearAddId])
    if (valid) {
      const values = getValues()
      const fromYear = +values[yearAddId]
      const inflationRate = +values[inflationAddId]
      if (!fromYear || !inflationRate) return null // This stops us from adding a new row with nothing in it could also null the button
      const newRecord = { fromYear, inflationRate }

      let insertIndex = 0
      const findIndex = fields.findIndex((it) => it.fromYear > fromYear)

      if (findIndex === -1) {
        insertIndex = fields.length
      } else {
        insertIndex = findIndex
      }

      // TODO: if value already found??

      insert(insertIndex, newRecord)

      // @ts-ignore
      setValue(yearAddId, "")
      // @ts-ignore
      setValue(inflationAddId, "")
    }
  }

  const onSubmit = (data: ChangedFormData) => {
    const { context } = selectedScenario

    const reformattedDataItems = data.items.map((it) => {
      return {
        fromYear: Number(it.fromYear),
        inflationRate: Number(it.inflationRate)
      }
    })

    const updatedContext: ContextConfig = {
      ...context,
      inflation: reformattedDataItems
    }

    const updatedScenario = { ...selectedScenario, context: updatedContext }

    updateScenario(updatedScenario)
    navigation.goBack()
  }

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <EditPageLayout
      heading={"Edit estimated inflation rates"}
      backText="Back to main context"
      cancelText="Cancel and return to context"
      saveText="Save changes"
      handleSubmit={handleSubmit(onSubmit)}
      handleBack={handleBack}
      handleCancel={handleBack}
    >
      <form>
        <>
          <div className="grid grid-cols-3  gap-2">
            <div className="font-bold">From year</div>
            <div className="font-bold">Inflation rate</div>
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
                  validationRules={inflationYearValidationRules}
                  restrictedCharSet={INTEGERS_ONLY}
                  type="number"
                />

                <InputField
                  id={`items.${index}.inflationRate`}
                  control={control}
                  defaultValue={it.inflationRate}
                  validationRules={inflationRateValidationRules}
                  restrictedCharSet={DECIMALS_ONLY}
                  type="number"
                />
                <div>
                  <Button onClick={() => handleDelete(index)}>
                    <div className="flex items-center gap-2">
                      <TrashIcon className="h-6 w-6" />
                      <div className="hidden md:flex">Remove</div>
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

        <div className="mt-6 grid grid-cols-3 justify-items-center gap-2">
          <InputField id={yearAddId} control={control} restrictedCharSet={INTEGERS_ONLY} />

          <InputField
            id={inflationAddId}
            control={control}
            // validationRules={newInflationRateValidationRules}
            restrictedCharSet={DECIMALS_ONLY}
          />

          <Button buttonType={ButtonType.tertiary} onClick={handleAdd}>
            <div className="flex items-center gap-2">
              <PlusCircleIcon className="h-6 w-6" />
              <div className="hidden md:flex">Add a row</div>
            </div>
          </Button>

          {/* <ErrorMessage errors={errors} name="yearAddId" render={({ message }) => <p>{message}</p>} /> */}
          {errors.yearAdd && (
            <div className="col-span-3 justify-self-start">
              <ValidationError id={`yearAdd_error`} errorMsg={errors.yearAdd.message || ""} />
            </div>
          )}
          {errors.inflationAdd && (
            <div className="col-span-3 justify-self-start">
              <ValidationError id={`inflationAdd_error`} errorMsg={errors.inflationAdd.message || ""} />
            </div>
          )}
          {/* {useError(control, yearAddId) && (
            <div className="col-span-3">
              <ValidationError
                id={`${yearAddId}_error`}
                errorMsg={errors[yearAddId] ? errors[yearAddId].message : ""}
              />
            </div>
          )}
          {getError(inflationAddId) && (
            <div className="col-span-3">
              <ValidationError id={`${inflationAddId}_error`} errorMsg={getError(inflationAddId).message} />
            </div>
          )} */}
        </div>
      </form>
    </EditPageLayout>
  )
}

export default InflationEditPage
