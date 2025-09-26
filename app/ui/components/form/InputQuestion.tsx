// TODO: use InputField
import React, { ChangeEvent } from "react"
import { Controller, Control, useFormContext } from "react-hook-form"
import { useError } from "../../hooks/useError"
import { FormGroup } from "../common/FormGroup"
import { Input } from "../common/Input"

type InputProps = {
  label: string
  id: string
  name?: string
  defaultValue?: string | number
  // control: Control<any, object>
  prefix?: string
  suffix?: string
  type?: "number" | "text" | "date"
  margin?: Object
  className?: string
  labelClassName?: string
  otherContainerProps?: object
  validationRules?: object
  placeholder?: string
  inputProps?: object
  maxLength?: number
  restrictedCharSet?: RegExp
  //   labelVariant?: LabelVariant
  disabled?: boolean
  editable?: boolean // TODO: remove this?
  helpText?: string
  ariaHelpLabel?: string
}

export const InputQuestion: React.FC<InputProps> = ({
  label,
  id,
  name,
  defaultValue,
  helpText,
  ariaHelpLabel,
  // editable = false,
  type,
  // control,
  prefix,
  suffix,
  validationRules,
  className,
  otherContainerProps = {},
  placeholder,
  inputProps,
  labelClassName,
  maxLength,
  // restrictedCharSet,
  disabled
}) => {
  const nameOfEl = name ?? id

  const { control } = useFormContext()

  const errorMsg = useError(nameOfEl)

  const handleOnChange = (value: string, onChange: Function) => {
    // Assumes empty input is always valid
    // const validInput = !value || (restrictedCharSet && value.match(restrictedCharSet)) || !restrictedCharSet
    // console.log("validInput", validInput)
    // if (validInput) {
    if (type === "number") {
      onChange(Number(value))
    } else {
      onChange(value)
    }
    // }
  }

  return (
    <FormGroup
      label={label}
      id={`formGroup-${id}`}
      errorMsg={errorMsg}
      helpText={helpText}
      helpAriaLabel={ariaHelpLabel}
    >
      <Controller
        name={nameOfEl}
        control={control}
        defaultValue={defaultValue} // need this for page back
        rules={validationRules}
        render={({ field: { value, onChange, onBlur, name: renderName, ref }, formState: { isSubmitted } }) => (
          <>
            <Input
              id={id}
              data-testid={id}
              disabled={disabled}
              name={renderName}
              type={type}
              // value={value}
              value={value || ""} // "" to avoid uncontrolled input warning
              // onChange={() => console.log("handle change")}
              onChange={(event: ChangeEvent<HTMLInputElement>) => handleOnChange(event.target.value, onChange)}
              // onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e, onChange)}
              // // This assumes handleSubmit performs validation
              // onBlur={() => setTimeout(onBlur, 100)}
              placeholder={placeholder}
              prefix={prefix}
              suffix={suffix}
              isError={!!errorMsg}
              ref={ref}
              //   valid={!errorMsg}
              //   isSubmitted={isSubmitted}
              aria-invalid={!!errorMsg}
              aria-describedby={errorMsg ? `${id}-validation-error` : undefined}
              // maxLength={maxLength}
              {...inputProps}
            />
          </>
        )}
      />
    </FormGroup>
  )
}
