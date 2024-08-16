import React from "react"
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

  const displayWarningAlert = (
    message: string | JSX.Element,
    toastOptions?: CustomToastOptions,
    onClose?: Function
  ): string => {
    toast.remove()
    const { dismissible = true } = toastOptions || {}

    const now = new Date()

    const id = toast.custom(
      (t: Toast) => (
        <AlertBanner
          variant={AlertType.warning}
          // message={now.toDateString()}
          // message={toastOptions?.duration ? toastOptions.duration.toString() : "no duration"}
          message={message}
          // message="Warning alert"
          onClose={() => {
            if (onClose) onClose()
            toast.remove(t.id)
          }}
          maxSize="half"
          dismissible={dismissible}
        />
      ),
      {
        ...defaultConfig.toastOptions,
        ...toastOptions
        // duration: 50000
      }
    )
    return id
  }

  const displayInfoAlert = (message: string | JSX.Element, toastOptions?: CustomToastOptions): string => {
    toast.remove()
    const { dismissible = true } = toastOptions || {}

    const id = toast.custom(
      (t) => (
        <AlertBanner
          variant={AlertType.info}
          message={message}
          onClose={() => toast.remove(t.id)}
          maxSize="half"
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
      (t) => (
        <AlertBanner
          variant={AlertType.error}
          message={message}
          onClose={() => toast.remove(t.id)}
          maxSize="half"
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
      (t) => (
        <AlertBanner
          variant={AlertType.success}
          message={message}
          onClose={() => toast.remove(t.id)}
          maxSize="half"
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
    displaySuccessAlert
  }
}

export { useAppAlert }
