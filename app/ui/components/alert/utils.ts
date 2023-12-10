import { AlertType } from "@/app/ui/components/alert/Alert"

// TODO: these colors should be defined in tailwind.config.js
export const getBackgroundColor = (alertType?: AlertType) => {
  switch (alertType) {
    case AlertType.success:
      return "bg-alert-success"

    case AlertType.error:
      return "bg-alert-error"

    case AlertType.warning:
      return "bg-alert-warning"

    case AlertType.info:
      return "bg-alert-info"

    default:
      return "bg-monochrome"
  }
}
