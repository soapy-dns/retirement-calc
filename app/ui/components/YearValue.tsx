import { contextConstants } from "@/app/(frontend)/(withNavBar)/(forms)/(configEdit)/context/contextConstants"
import { useForm } from "react-hook-form"
import { inflationYearValidationRules } from "../validation/inflationYear"
import { Button, ButtonType } from "./common/Button"
import { INTEGERS_ONLY } from "./common/formRegExes"
import { InputQuestion } from "./form/InputQuestion"
// import { zodResolver } from "@hookform/resolvers/zod"

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

// TODO: How so I re-use this for inflation and living expenses.  I could pass in
// the appropriate zodResolver function and have a generic as part of handleAdd, but that
// sound needlessly complicated
export const YearValue: React.FC<Props> = ({
  handleCancel,
  handleAdd,
  valueLabel,
  valueHelpText,
  valueValidationRules
}) => {
  const { handleSubmit, control, reset } = useForm<ChangedFormData>({
    defaultValues: {},
    reValidateMode: "onBlur"
    // resolver: zodResolver(FormSchema)
  })

  const clearFields = () => {
    reset({
      yearAdd: "",
      valueAdd: ""
    })
  }

  const onAdd = (data: ChangedFormData) => {
    const { yearAdd, valueAdd } = data
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
          placeholder="Add a year"
          label={contextConstants.FROM_YEAR.LABEL}
          restrictedCharSet={INTEGERS_ONLY}
          validationRules={inflationYearValidationRules}
          helpText={contextConstants.FROM_YEAR.HELP_TEXT}
        />

        <InputQuestion
          id="valueAdd"
          control={control}
          placeholder="Add an amount"
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
