import { AlertType } from "@/app/ui/components/alert/Alert"

// TODO: these colors should be defined in tailwind.config.js
export const getBackgroundColor = (alertType?: AlertType) => {
  switch (alertType) {
    case AlertType.success:
      return "bg-success"

    case AlertType.error:
      return "bg-error"

    case AlertType.warning:
      return "bg-warning"

    case AlertType.info:
      return "bg-info"

    default:
      return "bg-monochrome"
  }
}
