import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline"
import { SyntheticEvent, useState } from "react"
import { getErrorMsgId } from "../../utils"
import { Label } from "./Label"
import { ValidationError } from "./ValidationError"

interface IFormGroup {
  id: string
  label: string
  helpText?: string
  helpAriaLabel?: string
  errorMsg?: string
  children: React.ReactNode
}
export const FormGroup: React.FC<IFormGroup> = ({ id, label, helpText, helpAriaLabel, errorMsg, children }) => {
  const [showHelpText, setShowHelpText] = useState<boolean>(false)

  const toggleHelpText = (e: SyntheticEvent) => {
    e.preventDefault()

    setShowHelpText(!showHelpText)
  }

  return (
    <div className=" mb-8">
      <div className="ml-2 flex gap-2">
        <Label htmlFor={id}>{label}</Label>
        {helpText && (
          <button
            onClick={toggleHelpText}
            className="focus:outline focus:outline-2 focus:outline-primary cursor-pointer"
            aria-label={helpAriaLabel || "Help"}
          >
            <QuestionMarkCircleIcon className="h-5 w-5 text-primary-foreground" />
          </button>
        )}
      </div>
      <div className="ml-8">{children}</div>

      {showHelpText && <div className="ml-4 italic text-primary-foreground">{helpText}</div>}

      {errorMsg && <ValidationError id={getErrorMsgId(id)} errorMsg={errorMsg} />}
    </div>
  )
}
