import React, { JSX } from "react"
import toast, { Toast, ToastOptions, ToastPosition } from "react-hot-toast"
import { AlertType } from "../components/alert/Alert"
import { AlertBanner } from "../components/alert/AlertBanner"

interface CustomToastOptions extends ToastOptions {
  dismissible?: boolean
}

const bottomRight: ToastPosition = "bottom-right"

const useAppAlert = () => {
  const defaultConfig = {
    toastOptions: {
      // defaulting the duration to Infinity as user needs to dismiss the alerts in most cases explicitly.
      duration: Infinity,
      position: bottomRight
    }
  }

  const clearAlerts = () => {
    toast.remove()
  }

  const displayWarningAlert = (
    message: string | JSX.Element,
    toastOptions?: CustomToastOptions,
    onClose?: Function
  ): string => {
    toast.remove()
    const { dismissible = true } = toastOptions || {}

    const id = toast.custom(
      (t: Toast) => (
        <AlertBanner
          variant={AlertType.WARNING}
          message={message}
          onClose={() => {
            if (onClose) onClose()
            toast.dismiss(t.id)
          }}
          // maxSize="half"
          dismissible={dismissible}
        />
      ),
      {
        ...defaultConfig.toastOptions,
        ...toastOptions
      }
    )
    return id
  }

  const displayInfoAlert = (message: string | JSX.Element, toastOptions?: CustomToastOptions): string => {
    toast.remove()
    const { dismissible = true } = toastOptions || {}

    const id = toast.custom(
      (t: Toast) => (
        <AlertBanner
          variant={AlertType.INFO}
          message={message}
          onClose={() => toast.remove(t.id)}
          // maxSize="half"
          dismissible={dismissible}
        />
      ),
      {
        ...defaultConfig.toastOptions,
        ...toastOptions
      }
    )
    return id
  }

  // don't think it even passes in a JSX.eLEMENT
  const displayErrorAlert = (message: string | JSX.Element, toastOptions?: CustomToastOptions): string => {
    toast.remove()
    const { dismissible = true } = toastOptions || {}
    const id = toast.custom(
      (t: Toast) => (
        <AlertBanner
          variant={AlertType.ERROR}
          message={message}
          onClose={() => toast.remove(t.id)}
          // maxSize="half"
          dismissible={dismissible}
        />
      ),
      {
        ...defaultConfig.toastOptions,
        ...toastOptions
      }
    )
    return id
  }

  const displaySuccessAlert = (message: string | JSX.Element, toastOptions?: CustomToastOptions): string => {
    const { dismissible = true } = toastOptions || {}

    const id = toast.custom(
      (t: Toast) => (
        <AlertBanner
          variant={AlertType.SUCCESS}
          message={message}
          onClose={() => toast.remove(t.id)}
          // maxSize="half"
          dismissible={dismissible}
        />
      ),
      {
        ...defaultConfig.toastOptions,
        ...toastOptions
      }
    )
    return id
  }

  return {
    toasterConfig: defaultConfig,
    displayInfoAlert,
    displayWarningAlert,
    displayErrorAlert,
    displaySuccessAlert,
    clearAlerts
  }
}

export { useAppAlert }
