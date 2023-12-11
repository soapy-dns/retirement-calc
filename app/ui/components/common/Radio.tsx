import { MouseEventHandler } from "react"

export enum RadioVariant {
  VERTICAL = "VERTICAL",
  HORIZONTAL = "HORIZONTAL",
  BLOCK = "BLOCK"
}

interface RadioProps {
  id: string
  name: string
  options: Array<{ label: string; value: string }>
  value: string
  onChange: MouseEventHandler<HTMLInputElement>
  disabled?: boolean
  variant?: RadioVariant
}
export const Radio: React.FC<RadioProps> = ({
  id,
  name,
  options,
  value,
  onChange,
  disabled = false,
  variant = RadioVariant.VERTICAL
}) => {
  return (
    <div className={variant === RadioVariant.HORIZONTAL ? "flex flex-row gap-4" : "flex flex-col"}>
      {options.map((option, index) => {
        const { label, value: optionValue } = option

        return (
          <div key={`${optionValue}`}>
            <div className="flex gap-2">
              <input
                type="radio"
                id={id}
                data-testid={id}
                name={name}
                defaultChecked={value === optionValue}
                value={optionValue}
                onClick={onChange}
                className="mt-1 h-4 w-4 shrink-0 appearance-none rounded-full border-2 border-primary bg-white  ring-primary  checked:border-white checked:bg-primary checked:ring-2"
              />
              <label htmlFor={id} className="my-auto">
                {label}
              </label>
            </div>
          </div>
        )
      })}
    </div>
  )
}
