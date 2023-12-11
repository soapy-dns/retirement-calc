import { ChangeEvent } from "react"

interface CheckboxProps {
  id: string
  name: string
  options: Array<{ label: string; value: string; disabled?: boolean }>
  valueArray: string[]
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}
export const Checkbox: React.FC<CheckboxProps> = ({ id, name, options, valueArray = [], onChange }) => {
  console.log("--value, options--", valueArray, options)
  return (
    <>
      {options.map((option, index) => {
        const ind_id = `${id}_${index}`
        const { label, value } = option

        // console.log("--value, optionValue--", value, optionValue)

        const checked = valueArray && Array.isArray(valueArray) && valueArray.includes(value)
        console.log("--value, checked--", valueArray, value, checked)
        // TODO: needs more styling
        return (
          <div className="flex gap-2" key={ind_id}>
            <input
              type="checkbox"
              id={ind_id}
              data-testid={ind_id}
              name={`${name}_${index}`}
              value={value}
              checked={checked}
              onChange={onChange}
              className="
    peer relative mt-1
    h-4 w-4 shrink-0 appearance-none rounded-sm border-2 border-primary
    bg-white"
            />
            <label htmlFor={ind_id} className="my-auto">
              {label}
            </label>
            <svg
              className="absolute mt-1 hidden h-4 w-4 text-primary peer-checked:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        )
      })}
    </>
  )
}
