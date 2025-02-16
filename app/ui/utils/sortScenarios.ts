import { IScenario } from "@/app/lib/data/schema/config"

export const sortScenarios = (scenarios: IScenario[]): IScenario[] => {
  const newScenarios = [...scenarios]
  newScenarios.sort((a, b) => {
    if (a.asAtYear > b.asAtYear) return -1
    if (a.asAtYear < b.asAtYear) return 1
    return 0
  })

  return newScenarios
}
