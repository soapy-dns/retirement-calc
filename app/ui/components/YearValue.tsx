import { useEffect, useState } from "react"
import { contextConstants } from "@/app/(withCalculation)/(withNavBar)/(withContainer)/(config)/context/contextConstants"
import { SyntheticEvent } from "react"
import { useForm } from "react-hook-form"
import { inflationRateValidationRules, inflationYearValidationRules } from "../validation/inflationYear"
import { Button, ButtonType } from "./common/Button"
import { DECIMALS_ONLY, INTEGERS_ONLY } from "./common/formRegExes"
import { ValidationError } from "./common/ValidationError"
import { InputQuestion } from "./form/InputQuestion"

interface Props {
  // handleCancel: React.MouseEventHandler<HTMLButtonElement>
  valueLabel: string
  valueHelpText?: string
  handleCancel: Function
  handleAdd: (year: number, value: number) => void
  valueValidationRules?: object
}

interface ChangedFormData {
  valueAdd: string
  yearAdd: string
}

export const YearValue: React.FC<Props> = ({
  handleCancel,
  handleAdd,
  valueLabel,
  valueHelpText,
  valueValidationRules
}) => {
  const {
    // watch,
    // trigger,
    // getValues,
    // setValue,
    handleSubmit,
    control,
    reset,
    // formState: { isDirty, errors },
    clearErrors
  } = useForm<ChangedFormData>({ defaultValues: {} })

  const clearFields = () => {
    reset({
      yearAdd: "",
      valueAdd: ""
    })
  }

  const onAdd = (data: ChangedFormData) => {
    const { yearAdd, valueAdd } = data
    console.log("onAdd----")
    clearFields()

    handleAdd(+yearAdd, +valueAdd)
  }

  const onCancel = () => {
    clearFields()

    handleCancel()
  }

  return (
    <form>
      <div className="p-4">
        {/* <div className="mt-6 grid grid-cols-3 justify-items-center justify-self-start gap-2"> */}
        {/* @ts-ignore */}
        <InputQuestion
          id="yearAdd"
          control={control}
          label={contextConstants.FROM_YEAR.LABEL}
          restrictedCharSet={INTEGERS_ONLY}
          validationRules={inflationYearValidationRules}
          helpText={contextConstants.FROM_YEAR.HELP_TEXT}
        />

        <InputQuestion
          id="valueAdd"
          control={control}
          label={valueLabel}
          restrictedCharSet={INTEGERS_ONLY}
          validationRules={valueValidationRules || {}}
          helpText={valueHelpText}
        />

        <div className="grid grid-cols-2">
          {handleCancel && (
            <Button onClick={onCancel} buttonType={ButtonType.secondary}>
              Cancel
            </Button>
          )}

          {handleSubmit && (
            <Button onClick={handleSubmit(onAdd)} buttonType={ButtonType.primary}>
              Add
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}
