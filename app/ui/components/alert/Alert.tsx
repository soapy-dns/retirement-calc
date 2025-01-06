import { AlertIcon } from "./AlertIcon"
import { getBackgroundColor, getForegroundColor, getRole } from "./utils"

export enum AlertType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info"
}

interface IAlert {
  id?: string
  heading?: string
  alertType?: AlertType
  children?: React.ReactNode
}

export const Alert: React.FC<IAlert> = ({ id = "alert", alertType, heading, children }) => {
  const bgColor = getBackgroundColor(alertType)
  const foregroundColor = getForegroundColor(alertType)
  const role = getRole(alertType)

  return (
    <div id={id} className={`${bgColor} p-2 border`} role={`${role}`} tabIndex={-1}>
      <>
        {heading && (
          <div className="flex gap-2 mb-4">
            <AlertIcon alertType={alertType} />
            {<div className={`font-semibold text-${foregroundColor}`}>{heading}</div>}
          </div>
        )}
        {children && children}
      </>
    </div>
  )
}
