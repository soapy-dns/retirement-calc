import { ChangeEvent } from "react"

interface CheckboxProps {
  id: string
  name: string
  value: string
  label: string
  disabled?: boolean
  checked: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}
export const Checkbox: React.FC<CheckboxProps> = ({ id, name, label, value, checked, disabled = false, onChange }) => {
  return (
    <div className="flex gap-2" key={id}>
      <input
        type="checkbox"
        id={id}
        data-testid={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="
     mt-1
    h-8 w-8 shrink-0  rounded-sm border-2 border-red-500
    bg-white"
      />
      <label htmlFor={id} className="my-auto">
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
}
