import React, { FunctionComponent } from "react"
import { Controller, Control, useFormContext } from "react-hook-form"
import { useError } from "../../hooks/useError"
import { FormGroup } from "../common/FormGroup"
import { Textarea } from "../common/Textarea"

type TextAreaQuestionProps = {
  label: string
  id: string
  helpText?: string
  helpAriaLabel?: string
  placeholder?: string
  name?: string
  // control: Control<any, object>
  defaultValue?: string
  required?: boolean
  margin?: Object
  className?: string
  otherContainerProps?: object
  validationRules?: object
}

export const TextAreaQuestion: FunctionComponent<TextAreaQuestionProps> = ({
  label,
  id,
  name,
  required,
  // control,
  defaultValue,
  helpText = "",
  helpAriaLabel,
  placeholder,
  className,
  validationRules,
  otherContainerProps = {}
}) => {
  const nameOfEl = name ?? id
  const errorMsg = useError(nameOfEl)
  const { control } = useFormContext()

  return (
    <>
      <FormGroup
        label={label}
        id={id}
        helpText={helpText}
        helpAriaLabel={helpAriaLabel}
        {...otherContainerProps}
        errorMsg={errorMsg}
      >
        <Controller
          name={`${name ?? id}` as const}
          control={control}
          rules={validationRules}
          defaultValue={defaultValue}
          render={({ field: { value, onChange, name: renderName, onBlur, ref }, formState: { isSubmitted } }) => (
            <Textarea
              id={id}
              data-testid={id}
              name={renderName}
              value={value}
              onChange={onChange}
              //   onBlur={() => setTimeout(onBlur, 100)}
              required={required}
              placeholder={placeholder}
              //   ref={ref}
              maxLength={250}
              isError={false} // TODO:
              //   valid={!errorMsg}
              //   isSubmitted={isSubmitted}
            />
          )}
        />
      </FormGroup>
    </>
  )
}
