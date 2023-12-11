import { ChangeEvent } from "react"

interface ITextArea {
  id: string
  name: string
  disabled?: boolean
  placeholder?: string
  value?: string | number
  isError: boolean
  required?: boolean
  rows?: number
  maxLength?: number
  //   ref: RefCallback<HTMLDivElement>
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}
export const Textarea: React.FC<ITextArea> = ({
  isError,
  placeholder,
  disabled,
  value,
  onChange,
  required = false,
  maxLength = 250,
  rows = 4,
  ...rest
}) => {
  const colorClasses = isError ? "border-error text-error border-2" : "border border-gray-500"
  return (
    <textarea
      {...rest}
      className={`my-2 w-full p-4 ${colorClasses} resize-none appearance-none rounded`}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      onChange={onChange}
      rows={4}
      maxLength={maxLength}
    />
  )
}
