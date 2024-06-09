import { getYear } from "date-fns"

export const getCurrentYear = (): number => {
  const now = Date.now()

  return getYear(now)
}
