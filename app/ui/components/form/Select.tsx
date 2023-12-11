import { ISelectOption } from "data/types"
// import { RefCallback } from "react"
// import { ChangeEvent } from "react"

interface ISelect {
  id: string
  name?: string
  disabled?: boolean
  // placeholder?: string
  isError: boolean
  selectedOption?: ISelectOption
  value?: string | number
  options?: ISelectOption[]
  //   ref: RefCallback<HTMLDivElement>
  //   onChange: (event: ChangeEvent<HTMLSelectElement>) => void
  onChange: (string) => void
}
export const Select: React.FC<ISelect> = ({
  id,
  name,
  isError,
  options,
  // placeholder,
  disabled,
  value,
  onChange,
  ...rest
}) => {
  //   const colorClasses = isError ? "border-error text-error border-2" : "border"
  if (!name) name = id

  const handleSelect = (e) => {
    const selectedOption = options?.find((it) => it.value === e.target.value)
    onChange(selectedOption?.value)
  }

  return (
    <select
      onChange={handleSelect}
      value={value}
      className="my-2 mb-4 h-8 rounded border border-solid border-gray-500 focus:border-primary"
    >
      <option value="">--Select--</option>

      {options &&
        options.map((it) => (
          <option key={it.value} value={it.value}>
            {it.label}
          </option>
        ))}
    </select>
  )
}
