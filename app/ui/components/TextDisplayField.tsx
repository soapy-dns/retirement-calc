import { FormGroup } from "./common/FormGroup"

interface ITextDisplayFieldProps {
  label: string
  prefix?: string
  value: string | number
  suffix?: string
}

// whitespace-pre-wrap is needed to ensure that the text wraps and that new lines are respected.
export const TextDisplayField: React.FunctionComponent<ITextDisplayFieldProps> = ({ label, prefix, value, suffix }) => {
  return (
    <FormGroup label={label} id={label}>
      <p className="mb-4 whitespace-pre-wrap">
        {prefix && prefix}
        {value || "-"}
        {suffix && suffix}
      </p>
    </FormGroup>
  )
}
