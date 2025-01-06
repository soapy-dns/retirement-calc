import { XMarkIcon } from "@heroicons/react/24/outline"
import { AlertType } from "./Alert"
import { AlertHeading, AlertIcon } from "./AlertIcon"
import { getBackgroundColor, getForegroundColor } from "./utils"

interface Props {
  variant: AlertType
  message: string | JSX.Element
  onClose: React.MouseEventHandler<HTMLButtonElement>
  dismissible: boolean
  maxSize?: "full" | "half"
}

export const AlertBanner: React.FC<Props> = ({ onClose, variant, message, dismissible = true, maxSize = "full" }) => {
  const backgroundColor = getBackgroundColor(variant)
  const foregroundColor = getForegroundColor(variant)

  return (
    <div className={`border  ${backgroundColor} w-screen ${maxSize === "half" ? "max-w-lg" : null} p-4`} role="alert">
      <h2 className={`text-${foregroundColor}`}>
        <div className="grid grid-cols-3">
          <div></div>
          <div className="flex items-center justify-center gap-2">
            <AlertIcon alertType={variant} />
            <AlertHeading alertType={variant} />
          </div>{" "}
          {dismissible && (
            <button onClick={onClose} className="justify-self-end">
              <XMarkIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      </h2>

      <div className="flex items-center justify-center">{message}</div>
    </div>
  )
}
