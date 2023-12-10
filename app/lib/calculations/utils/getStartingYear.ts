import { getYear } from "date-fns"

export const getStartingYear = (): number => {
  const now = Date.now()

  return getYear(now)
}
