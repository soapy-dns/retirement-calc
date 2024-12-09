import * as React from "react"
import { FormGroup } from "./common/FormGroup"

interface ITextDisplayFieldProps {
  label: string
  // helpText?: string
  // helpAriaLabel?: string // not sure we want help on a display only component TODO:
  prefix?: string
  value: string | number
  suffix?: string
}

export const TextDisplayField: React.FunctionComponent<ITextDisplayFieldProps> = ({
  label,
  // helpText,
  // helpAriaLabel,
  prefix,
  value,
  suffix
}) => {
  return (
    <FormGroup label={label} id="textdisplayfield">
      <p className="mb-2" id="textdisplayfield">
        {prefix && prefix}
        {value || "-"}
        {suffix && suffix}
      </p>
    </FormGroup>
  )
}
