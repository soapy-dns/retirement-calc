import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { getErrorMsgId } from "../../utils"
import { Label } from "./Label"
import { ValidationError } from "./ValidationError"

interface IFormGroup {
  id: string
  label: string
  helpText?: string
  errorMsg?: string
  children: React.ReactNode
}
export const FormGroup: React.FC<IFormGroup> = ({ id, label, helpText, errorMsg, children }) => {
  const [showHelpText, setShowHelpText] = useState<boolean>(false)

  const toggleHelpText = (e) => {
    e.preventDefault()

    setShowHelpText(!showHelpText)
  }

  return (
    <div className="my-4">
      <div className="ml-2 flex">
        <>
          <Label htmlFor={id}>{label}</Label>
          {helpText && (
            <button onClick={toggleHelpText}>
              <QuestionMarkCircleIcon className="ml-2 h-5 w-5 text-primary" />
            </button>
          )}
        </>
      </div>
      <div className="ml-8">{children}</div>

      {showHelpText && <div className="ml-4 italic text-gray-500">{helpText}</div>}

      {errorMsg && <ValidationError id={getErrorMsgId(id)} errorMsg={errorMsg} />}
    </div>
  )
}
