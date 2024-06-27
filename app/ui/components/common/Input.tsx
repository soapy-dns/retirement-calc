import { RefCallback } from "react"
import { ChangeEvent } from "react"
import { Prefix } from "./Prefix"
import { Suffix } from "./Suffix"

interface IInput {
  id: string
  name: string
  className?: string
  disabled?: boolean
  placeholder?: string
  value?: string | number
  isError: boolean
  prefix?: string
  suffix?: string
  ref: RefCallback<HTMLDivElement>
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void
}
export const Input: React.FC<IInput> = ({
  id,
  isError,
  placeholder,
  disabled,
  value,
  onChange,
  onBlur,
  className,
  prefix,
  suffix,
  ...rest
}) => {
  const colorClasses = isError ? "border-error text-error border-2" : "border border-gray-500"

  let roundedClasses
  if (!prefix && !suffix) {
    roundedClasses = "rounded"
  } else if (prefix && !suffix) {
    roundedClasses = "rounded-r"
  } else if (!prefix && suffix) {
    roundedClasses = "rounded-l"
  }

  return (
    <div className="justify-left flex items-center gap-0 ">
      {prefix && <Prefix text={prefix} />}
      <input
        {...rest}
        id={id}
        className={`my-2 h-8 w-3/4 p-4 ${roundedClasses} ${colorClasses} ${className} focus:outline focus:outline-2 focus:outline-primary`}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
      />
      {suffix && <Suffix text={suffix} />}
    </div>
  )
}
