import { ISelectOption } from "@/app/lib/data/types"
import { ChangeEvent } from "react"
import { Alert, AlertType } from "../alert/Alert"

interface ISelect {
  id: string
  name?: string
  disabled?: boolean
  isError: boolean
  selectedOption?: ISelectOption
  value?: string | number
  options?: ISelectOption[]
  summaryText?: string
  onChange: (value?: string) => void
  allowsNull?: boolean
}
export const Select: React.FC<ISelect> = ({
  id,
  name,
  isError,
  options,
  summaryText,
  disabled,
  value,
  onChange,
  allowsNull = true,
  ...rest
}) => {
  if (!name) name = id

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = options?.find((it) => it.value === e.target.value)
    onChange(selectedOption?.value)
  }

  return (
    <>
      <select
        onChange={handleSelect}
        value={value}
        className="my-2 mb-4 h-8 rounded border border-solid border-gray-500 focus:outline focus:outline-2 focus:outline-primary "
      >
        {allowsNull && <option value="">--Select--</option>}

        {options &&
          options.map((it) => (
            <option key={it.value} value={it.value}>
              {it.label}
            </option>
          ))}
      </select>

      {/* Should probably pass in the heading too */}
      {summaryText && (
        <Alert heading="Details" alertType={AlertType.info}>
          {summaryText}
        </Alert>
      )}
    </>
  )
}
