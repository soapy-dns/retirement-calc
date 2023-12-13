import React, { ChangeEvent } from "react"
import { Controller, Control } from "react-hook-form"
import { useError } from "../../hooks/useError"
import { FormGroup } from "../common/FormGroup"
import { Input } from "../common/Input"

type InputProps = {
  label: string
  id: string
  name?: string
  owners?: string[]
  control: Control<any, object>
  prefix?: string
  type?: string
  margin?: Object
  className?: string
  labelClassName?: string
  otherContainerProps?: object
  validationRules?: object
  placeholder?: string
  inputProps?: object
  maxLength?: number
  restrictedCharSet?: RegExp
  disabled?: boolean
  editable?: boolean
  helpText?: string
}

export const OwnerQuestion: React.FC<InputProps> = ({
  label,
  id,
  name,
  owners,
  helpText,
  editable = false,
  type,
  control,
  validationRules,
  className,
  inputProps,
  labelClassName,
  maxLength,
  restrictedCharSet,
  disabled,
  placeholder
  //   labelVariant
}) => {
  const nameOfEl = name ?? id

  const errorMsg = useError(control, nameOfEl)

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>, onChange: Function) => {
    const {
      target: { value }
    } = event
    // Assumes empty input is always valid
    const validInput = !value || (restrictedCharSet && value.match(restrictedCharSet)) || !restrictedCharSet
    if (validInput) {
      onChange(event)
    }
  }

  return (
    <FormGroup label={label} id={id} errorMsg={errorMsg} helpText={helpText}>
      {editable ? (
        <Controller
          name={nameOfEl}
          control={control}
          rules={validationRules}
          render={({ field: { value, onChange, onBlur, name: renderName, ref }, formState: { isSubmitted } }) => (
            <>
              <Input
                id={id}
                data-testid={id}
                disabled={disabled}
                name={renderName}
                // type={type}
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e, onChange)}
                // // This assumes handleSubmit performs validation
                // onBlur={() => setTimeout(onBlur, 100)}
                placeholder={placeholder}
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
      ) : (
        <ul>
          {owners?.map((it) => (
            <li className="list-disc" key={it}>
              {it}
            </li>
          ))}
        </ul>
      )}
    </FormGroup>
  )
}
