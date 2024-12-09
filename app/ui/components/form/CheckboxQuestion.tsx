import React, { ChangeEvent } from "react"
import { Control } from "react-hook-form"
import { useError } from "../../hooks/useError"
import { FormGroup } from "../common/FormGroup"

type CheckboxProps = {
  label: string
  id: string
  name: string
  defaultValue?: Array<string>
  control: Control<any, object>
  options: Array<{ label: string; value: string; disabled?: boolean }>
  className?: string
  otherContainerProps?: object
  // validationRules?: object
  onChange: Function
  helpText?: string
  helpAriaLabel?: string
}

export const CheckboxQuestion = React.forwardRef<HTMLInputElement, CheckboxProps>((props, forwardedRef) => {
  const {
    label,
    id,
    name,
    options,
    control,
    otherContainerProps = {},
    // validationRules,
    helpText,
    helpAriaLabel,
    onChange // from ...register
  } = props
  const nameOfEl = name ?? id

  const errorMsg = useError(control, nameOfEl)

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event) // this comes from the ...register - I think I could maybe also get it from useForm(control)
  }

  return (
    <FormGroup
      label={label}
      id={id}
      helpText={helpText}
      helpAriaLabel={helpAriaLabel}
      {...otherContainerProps}
      errorMsg={errorMsg}
    >
      {options.map((option, index) => {
        const ind_id = `${id}_${index}`
        const { label, value: checkboxValue } = option
        return (
          <div className="flex gap-2" key={ind_id}>
            <input
              type="checkbox"
              name={name}
              data-testid={name}
              value={checkboxValue}
              ref={forwardedRef}
              onChange={handleOnChange}
              className="mt-1 h-6 w-6 shrink-0  rounded-sm border-2  bg-white accent-primary"
              // TODO: it is the className that is causing weird stuff to happen!!!  peer, relative or appearance-none
            />
            <label htmlFor={name} className="my-auto">
              {label}
            </label>
          </div>
        )
      })}
    </FormGroup>
  )
})

CheckboxQuestion.displayName = "CheckboxQuestion"
