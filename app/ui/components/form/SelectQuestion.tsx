import { ISelectOption } from "@/app/lib/data/types"
import { Control, Controller } from "react-hook-form"
import { FormGroup } from "../common/FormGroup"
import { Select } from "../common/Select"

type SelectProps = {
  label: string
  id: string
  name?: string
  defaultValue?: string | number
  control: Control<any, object>
  className?: string
  labelClassName?: string
  otherContainerProps?: object
  validationRules?: object
  placeholder?: string
  disabled?: boolean
  editable?: boolean
  helpText?: string
  options?: ISelectOption[]
  selectedValue?: string | number // this is the code
  errorMsg?: string
}

export const SelectQuestion = ({
  label,
  id,
  name,
  editable,
  options,
  control,
  validationRules,
  defaultValue,
  helpText,
  errorMsg
}: SelectProps) => {
  const nameOfEl = name ?? id

  // TODO: fix isError
  return (
    <FormGroup label={label} id={`formGroup-${id}`} errorMsg={errorMsg} helpText={helpText}>
      <Controller
        name={nameOfEl}
        control={control}
        defaultValue={defaultValue} // need this for page back
        rules={validationRules}
        render={({ field: { value, onChange, onBlur, name: renderName, ref }, formState: { isSubmitted } }) => (
          <Select id={id} name={nameOfEl} onChange={onChange} isError={false} value={value} options={options} />
        )}
      />
    </FormGroup>
  )
}
