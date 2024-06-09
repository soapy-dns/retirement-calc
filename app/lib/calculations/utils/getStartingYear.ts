import { getYear } from "date-fns"
import { IScenario } from "../../data/schema/config"

export const getStartingYear = (): number => {
  const now = Date.now()

  return getYear(now)
}
