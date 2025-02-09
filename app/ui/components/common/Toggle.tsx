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

  // hover: bg - primary - darker
  const selectedClasses = "  bg-primary  text-white "
  const unselectedClasses = " text-primary-foreground  "

  return (
    <div className="grid md:w-1/3 grid-cols-2">
      {options.map((option, index) => {
        const { label, value: optionValue } = option
        const id_ind = `${id}_${index}`

        const selected = value === optionValue

        return (
          <div
            key={`${optionValue}`}
            className={`flex justify-center border-primary border  py-1  first:rounded-l-md last:rounded-r-md focus:outline-none focus:ring-0  focus:border-2  ${
              selected ? selectedClasses : unselectedClasses
            }`}
          >
            <label htmlFor={id_ind} className="px-1">
              {label}
            </label>
            <input
              type="radio"
              id={id_ind}
              data-testid={id_ind}
              name={name}
              defaultChecked={value === optionValue}
              value={optionValue}
              onClick={onChange}
              className="opacity-0  "
            />
          </div>
        )
      })}
    </div>
  )
}
