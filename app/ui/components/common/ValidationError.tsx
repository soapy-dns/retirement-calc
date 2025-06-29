import { XCircleIcon } from "@heroicons/react/24/outline"

interface ValidationErrorProps {
  id: string
  errorMsg: string
}
export const ValidationError: React.FC<ValidationErrorProps> = ({ id, errorMsg }) => {
  return (
    <p id={id} className="text-left text-destructive-foreground flex items-center">
      <XCircleIcon className="mr-2 h-6 w-6" aria-hidden />
      {errorMsg}
    </p>
  )
}
