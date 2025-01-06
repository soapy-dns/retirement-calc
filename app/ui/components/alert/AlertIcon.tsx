import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline"
import { AlertType } from "./Alert"

interface AlertIconProps {
  alertType?: AlertType
}

export const AlertIcon: React.FC<AlertIconProps> = ({ alertType }) => {
  switch (alertType) {
    case AlertType.ERROR:
      return <ExclamationCircleIcon className="h-6 w-6 text-error-foreground" />

    case AlertType.WARNING:
      return <ExclamationTriangleIcon className="h-6 w-6 text-warning-foreground" />

    case AlertType.SUCCESS:
      return <CheckCircleIcon className="h-6 w-6 text-success-foreground" />

    case AlertType.INFO:
      return <InformationCircleIcon className="h-6 w-6 text-info-foreground" />

    default:
      return null
  }
}

export const AlertHeading: React.FC<AlertIconProps> = ({ alertType }) => {
  switch (alertType) {
    case AlertType.ERROR:
      return <div className="text-error-foreground">Error</div>

    case AlertType.WARNING:
      return <div className="text-warning-foreground">Warning</div>

    case AlertType.SUCCESS:
      return <div className="text-success-foreground">Success</div>

    case AlertType.INFO:
      return <div className="text-info-foreground">Info</div>

    default:
      return null
  }
}
