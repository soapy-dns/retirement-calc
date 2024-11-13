import { AlertIcon } from "./AlertIcon"
import { getBackgroundColor, getRole } from "./utils"

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
  const role = getRole(alertType)

  return (
    <div id={id} className={`${bgColor} p-2 border border-primary-foreground`} role={`${role}`} tabIndex={-1}>
      <>
        {heading && (
          <div className="flex gap-2 mb-4">
            <AlertIcon alertType={alertType} />
            {<div className="font-semibold">{heading}</div>}
          </div>
        )}
        {children && children}
      </>
    </div>
  )
}
