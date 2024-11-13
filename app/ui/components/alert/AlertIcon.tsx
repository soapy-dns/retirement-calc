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
      return <ExclamationCircleIcon className="h-6 w-6 text-error" />

    case AlertType.WARNING:
      return <ExclamationTriangleIcon className="h-6 w-6 text-primary-foreground" />

    case AlertType.SUCCESS:
      return <CheckCircleIcon className="h-6 w-6 text-primary-foreground" />

    case AlertType.INFO:
      return <InformationCircleIcon className="h-6 w-6 text-primary-foreground" />

    default:
      return null
  }
}

export const AlertHeading: React.FC<AlertIconProps> = ({ alertType }) => {
  switch (alertType) {
    case AlertType.ERROR:
      return <div>Error</div>

    case AlertType.WARNING:
      return <div>Warning</div>

    case AlertType.SUCCESS:
      return <div>Success</div>

    case AlertType.INFO:
      return <div>Info</div>

    default:
      return null
  }
}
