import { XCircleIcon } from "@heroicons/react/24/outline"

interface ValidationErrorProps {
  id: string
  errorMsg: string
}
export const ValidationError: React.FC<ValidationErrorProps> = ({ id, errorMsg }) => {
  return (
    <p id={id} className="text-left text-error">
      <div className="flex items-center">
        <XCircleIcon className="mr-2 h-4 w-4" aria-hidden />
        <div>{errorMsg}</div>
      </div>
    </p>
  )
}
