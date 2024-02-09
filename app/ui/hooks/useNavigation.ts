import { useRouter } from "next/navigation"
import { AppPath } from "../types"

export interface Option {
  // id: string
  [key: string]: string
}

export const useNavigation = () => {
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  // TODO: there may be a simpler way.  just trying to think of migration to nextjs
  const goTo = (appPath: AppPath, options?: Option) => {
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
