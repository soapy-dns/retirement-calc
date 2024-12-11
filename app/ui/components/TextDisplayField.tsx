import { FormGroup } from "./common/FormGroup"

interface ITextDisplayFieldProps {
  label: string
  prefix?: string
  value: string | number
  suffix?: string
}

export const TextDisplayField: React.FunctionComponent<ITextDisplayFieldProps> = ({ label, prefix, value, suffix }) => {
  return (
    <FormGroup label={label} id={label}>
      <p className="mb-2">
        {prefix && prefix}
        {value || "-"}
        {suffix && suffix}
      </p>
    </FormGroup>
  )
}
