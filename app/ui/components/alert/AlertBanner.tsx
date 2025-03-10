import { JSX } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { AlertType } from "./Alert"
import { AlertIcon } from "./AlertIcon"
import { getBackgroundColor, getBorderForegroundColor, getTextForegroundColor } from "./utils"

interface Props {
  variant: AlertType
  message: string | JSX.Element
  onClose: React.MouseEventHandler<HTMLButtonElement>
  dismissible: boolean
  maxSize?: "full" | "half"
}

export const AlertBanner: React.FC<Props> = ({ onClose, variant, message, dismissible = true, maxSize = "full" }) => {
  const backgroundColor = getBackgroundColor(variant)
  const textForegroundColor = getTextForegroundColor(variant)
  const borderForegroundColor = getBorderForegroundColor(variant)

  // const errorForegroundColor = "border-error-foreground"

  return (
    <div
      className={` ${backgroundColor} w-screen ${maxSize === "half" ? "max-w-lg" : null} p-1 border-2 ${borderForegroundColor}`}
      role="alert"
    >
      <div className="flex justify-between">
        <div className={`flex gap-2 items-center justify-center ${textForegroundColor} w-full`}>
          <AlertIcon alertType={variant} />
          {message}
        </div>
        {dismissible && (
          <button onClick={onClose} className="">
            <XMarkIcon className="h-6 w-6 text-primary" />
          </button>
        )}
      </div>
    </div>
  )
}
