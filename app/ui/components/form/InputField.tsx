import React, { ChangeEvent } from "react"
import { Controller, Control } from "react-hook-form"
import { useError } from "../../hooks/useError"
import { Input } from "../common/Input"
// import { useError } from "../hooks/useError"
// import { Input } from "./form/Input"

interface PrefixProps {
  text?: string
}

const Prefix: React.FC<PrefixProps> = ({ text }) => {
  if (text) return <div className="inline-block border bg-gray-100 p-1">{text}</div>
  return null
}

interface SuffixProps {
  text?: string
}

const Suffix: React.FC<SuffixProps> = ({ text }) => {
  if (text) return <div className="inline-block border bg-gray-100 p-1">{text}</div>
  return null
}

type InputProps = {
  id: string
  name?: string
  defaultValue?: string | number
  control: Control<any, object>
  prefix?: string
  suffix?: string
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
}

export const InputField: React.FC<InputProps> = ({
  id,
  name,
  defaultValue,
  type,
  control,
  prefix,
  suffix,
  validationRules,
  className,
  otherContainerProps = {},
  placeholder,
  inputProps,
  labelClassName,
  maxLength,
  restrictedCharSet,
  disabled
  //   labelVariant
}) => {
  const nameOfEl = name ?? id

  const errorMsg = useError(control, nameOfEl)

  const handleOnChange = (value: string, onChange: Function) => {
    // const {
    //   target: { value }
    // } = event
    console.log(
      "--restrictedCharSet, value, value.match(restrictedCharSet)--",
      restrictedCharSet,
      "-",
      value,
      "-",
      value.match(restrictedCharSet || "")
    )
    // Assumes empty input is always valid
    const validInput = !value || (restrictedCharSet && value.match(restrictedCharSet)) || !restrictedCharSet
    if (validInput) {
      onChange(value)
    }
  }

  return (
    <>
      <Controller
        name={nameOfEl}
        control={control}
        defaultValue={defaultValue} // need this for page back
        rules={validationRules}
        render={({ field: { value, onChange, onBlur, name: renderName, ref }, formState: { isSubmitted } }) => (
          <>
            {prefix && <Prefix text={prefix} />}
            <Input
              id={id}
              data-testid={id}
              disabled={disabled}
              name={renderName}
              // type={type}
              value={value}
              // onChange={handleOnChange}
              onChange={(event: ChangeEvent<HTMLInputElement>) => handleOnChange(event.target.value, onChange)}
              // onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e, onChange)}
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
            {suffix && <Suffix text={suffix} />}
          </>
        )}
      />
    </>
  )
}
