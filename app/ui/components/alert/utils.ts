import { AlertType } from "@/app/ui/components/alert/Alert"

// TODO: these colors should be defined in tailwind.config.js
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
