import React from "react"
import toast, { ToastOptions } from "react-hot-toast"
import { AlertType } from "../components/alert/Alert"
import { AlertBanner } from "../components/alert/AlertBanner"

interface CustomToastOptions extends ToastOptions {
  dismissible?: boolean
}

const useAppAlert = () => {
  const defaultConfig = {
    toastOptions: {
      // defaulting the duration to Infinity as user needs to dismiss the alerts in most cases explicitly.
      duration: Infinity
    },
    containerStyle: {
      inset: "0px"
    }
  }

  const displayWarningAlert = (
    message: string | JSX.Element,
    toastOptions?: CustomToastOptions,
    onClose?: Function
  ): string => {
    toast.remove()
    const { dismissible = true } = toastOptions || {}

    const id = toast.custom(
      (t) => (
        <div className="fixed top-20">
          <AlertBanner
            variant={AlertType.warning}
            message={message}
            onClose={() => {
              if (onClose) onClose()
              toast.remove(t.id)
            }}
            dismissible={dismissible}
          />
        </div>
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
      (t) => (
        <AlertBanner
          variant={AlertType.info}
          message={message}
          onClose={() => toast.remove(t.id)}
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
