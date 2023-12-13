import * as React from "react"
import { FormGroup } from "../common/FormGroup"

interface ITextDisplayFieldProps {
  label: string
  helpText?: string
  prefix?: string
  value: string | number
  suffix?: string
}

export const TextDisplayField: React.FunctionComponent<ITextDisplayFieldProps> = ({
  label,
  helpText,
  prefix,
  value,
  suffix
}) => {
  return (
    <FormGroup label={label} id="textdisplayfield" helpText={helpText}>
      <p className="mb-2" id="textdisplayfield">
        {prefix && prefix}
        {value || "-"}
        {suffix && suffix}
      </p>
    </FormGroup>
  )
}
