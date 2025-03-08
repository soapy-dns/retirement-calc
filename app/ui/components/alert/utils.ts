import { AlertType } from "@/app/ui/components/alert/Alert"

export const getBackgroundColor = (alertType?: AlertType) => {
  switch (alertType) {
    case AlertType.SUCCESS:
      return "bg-success"

    case AlertType.ERROR:
      return "bg-error"

    case AlertType.WARNING:
      return "bg-warning"

    case AlertType.INFO:
      return "bg-info"

    default:
      return "bg-monochrome"
  }
}

export const getTextForegroundColor = (alertType?: AlertType) => {
  switch (alertType) {
    case AlertType.SUCCESS:
      return "text-success-foreground"

    case AlertType.ERROR:
      return "text-error-foreground"

    case AlertType.WARNING:
      return "text-warning-foreground"

    case AlertType.INFO:
      return "text-info-foreground"

    default:
      return "text-monochrome"
  }
}

export const getBorderForegroundColor = (alertType?: AlertType) => {
  switch (alertType) {
    case AlertType.SUCCESS:
      return "border-success-foreground"

    case AlertType.ERROR:
      return "border-error-foreground"

    case AlertType.WARNING:
      return "border-warning-foreground"

    case AlertType.INFO:
      return "border-info-foreground"

    default:
      return "border-monochrome"
  }
}

export const getRole = (alertType?: AlertType) => {
  switch (alertType) {
    case AlertType.SUCCESS:
      return "status"

    case AlertType.ERROR:
      return "alert"

    case AlertType.WARNING:
      return "alert"

    case AlertType.INFO:
      return "status"

    default:
      return "alert"
  }
}
