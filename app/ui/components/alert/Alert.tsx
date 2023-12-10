import { AlertIcon } from "./AlertIcon"
import { getBackgroundColor } from "./utils"

export enum AlertType {
  success = "success",
  error = "error",
  warning = "warning",
  info = "info"
}

interface IAlert {
  id?: string
  heading?: string
  alertType?: AlertType
  children: React.ReactNode
}

export const Alert: React.FC<IAlert> = ({ id = "alert", alertType, heading, children }) => {
  const bgColor = getBackgroundColor(alertType)

  return (
    <div id={id} className={`${bgColor} m-4 border-2 p-4`} role="alert" tabIndex={-1}>
      <>
        {heading && (
          <div className="flex gap-2">
            <AlertIcon alertType={alertType} />
            {<h2 className="font-bold">{heading}</h2>}
          </div>
        )}

        {children}
      </>
    </div>
  )
}
