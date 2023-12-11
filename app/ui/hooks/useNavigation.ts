// import { useHistory } from "react-router-dom"
// import { AccordionItem } from "view/components/accordian/AccordianItem"
// import { AppPath } from "view/routes/types"
import { useRouter } from "next/navigation"
import { AppPath } from "../types"

export interface Options {
  [key: string]: string
}

export const useNavigation = () => {
  const router = useRouter()

  const goBack = () => {
    router.back()
  }

  // TODO: there may be a simpler way.  just trying to think of migration to nextjs
  const goTo = (appPath: AppPath, options?: Options) => {
    // if (!options) return history.push(appPath)
    // const path = Object.entries(options)?.reduce((accum: string, [key, value]: [string, string]) => {
    //   const regEx = new RegExp(`:${key}`)
    //   const replaced = accum.replace(regEx, value)
    //   return replaced
    // }, appPath)
    // history.push(path)
  }

  return {
    goBack,
    goTo
  }
}
