import { MouseEventHandler } from "react"

export enum ToggleVariant {
  FULLWIDTH = "FULLWIDTH",
  GRID = "GRID"
}

interface Props {
  id: string
  name: string
  options: Array<{ label: string; value: string }>
  value: string
  onChange: MouseEventHandler<HTMLInputElement>
  disabled?: boolean
  variant?: ToggleVariant
}
export const Toggle: React.FC<Props> = ({
  id,
  name,
  options,
  value,
  onChange,
  disabled = false,
  variant = ToggleVariant.FULLWIDTH
}) => {
  const cols = 2 // TODO: depends on num of options

  const selectedClasses =
    "hover:bg-primary-darkerborder-primary border-primary  bg-primary py-1 px-4 text-white first:rounded-l-md last:rounded-r-md my-2"
  const unselectedClasses = "border-2 border-primary py-1 px-4 text-primary  first:rounded-l-md last:rounded-r-md my-2"

  return (
    <div className="grid w-1/4 grid-cols-2">
      {options.map((option, index) => {
        const { label, value: optionValue } = option
        const id_ind = `${id}_${index}`

        const selected = value === optionValue

        return (
          <div key={`${optionValue}`} className={selected ? selectedClasses : unselectedClasses}>
            <input
              type="radio"
              id={id_ind}
              data-testid={id_ind}
              name={name}
              defaultChecked={value === optionValue}
              value={optionValue}
              onClick={onChange}
              className="opacity-0"
            />
            <label htmlFor={id_ind} className="my-auto">
              {label}
            </label>
          </div>
        )
      })}
    </div>
  )
}
