import { AlertIcon } from "./AlertIcon"
import { getBackgroundColor, getTextForegroundColor, getRole } from "./utils"

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
  const textForegroundColor = getTextForegroundColor(alertType)
  const role = getRole(alertType)

  return (
    <div id={id} className={`${bgColor} p-2 border`} role={`${role}`} tabIndex={-1}>
      <>
        {heading && (
          <div className="flex gap-2">
            <AlertIcon alertType={alertType} />
            {<div className={`font-semibold ${textForegroundColor}`}>{heading}</div>}
          </div>
        )}

        {children && <div className="mt-4">{children}</div>}
      </>
    </div>
  )
}
