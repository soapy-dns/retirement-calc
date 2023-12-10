import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline"
import { AlertType } from "./Alert"

interface AlertIconProps {
  alertType?: AlertType
  // className?: string
}

export const AlertIcon: React.FC<AlertIconProps> = ({ alertType }) => {
  switch (alertType) {
    case AlertType.error:
      return <ExclamationCircleIcon className="h-6 w-6" />

    case AlertType.warning:
      return <ExclamationTriangleIcon className="h-6 w-6" />

    case AlertType.success:
      return <CheckCircleIcon className="h-6 w-6" />

    case AlertType.info:
      return <InformationCircleIcon className="h-6 w-6" />

    default:
      return null
  }
}

export const AlertHeading: React.FC<AlertIconProps> = ({ alertType }) => {
  switch (alertType) {
    case AlertType.error:
      return <div>Error</div>

    case AlertType.warning:
      return <div>Warning</div>

    case AlertType.success:
      return <div>Success</div>

    case AlertType.info:
      return <div>Info</div>

    default:
      return null
  }
}
