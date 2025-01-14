import { useRouter } from "next/navigation"
import { AppPath } from "../types"
import { useAppAlert } from "./useAppAlert"

export interface Option {
  // id: string
  [key: string]: string
}

export const useNavigation = () => {
  const router = useRouter()
  const { clearAlerts } = useAppAlert()

  const goBack = () => {
    clearAlerts()
    router.back()
  }

  // TODO: there may be a simpler way.  just trying to think of migration to nextjs
  const goTo = (appPath: AppPath, options?: Option) => {
    clearAlerts()

    if (!options) return router.push(appPath)
    const path = Object.entries(options)?.reduce((accum: string, [key, value]: [string, string]) => {
      const regEx = new RegExp(`:${key}`)
      const replaced = accum.replace(regEx, value)
      return replaced
    }, appPath)
    router.push(path)
  }

  return {
    goBack,
    goTo
  }
}
