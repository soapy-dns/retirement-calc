import { ISelectOption } from "@/app/lib/data/types"
import { ChangeEvent } from "react"

interface ISelect {
  id: string
  name?: string
  disabled?: boolean
  // placeholder?: string
  isError: boolean
  selectedOption?: ISelectOption
  value?: string | number
  options?: ISelectOption[]
  summaryText?: string
  //   ref: RefCallback<HTMLDivElement>
  //   onChange: (event: ChangeEvent<HTMLSelectElement>) => void
  onChange: (value?: string) => void
  allowsNull?: boolean
}
export const Select: React.FC<ISelect> = ({
  id,
  name,
  isError,
  options,
  // placeholder,
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
        className="my-2 mb-4 h-8 rounded border border-solid border-gray-500 focus:border-primary"
      >
        {allowsNull && <option value="">--Select--</option>}

        {options &&
          options.map((it) => (
            <option key={it.value} value={it.value}>
              {it.label}
            </option>
          ))}
      </select>
      {summaryText && (
        <p className="italic text-gray-500  mb-2 flex gap-2 items-center">
          <div>-</div>
          {summaryText}
        </p>
      )}
    </>
  )
}
