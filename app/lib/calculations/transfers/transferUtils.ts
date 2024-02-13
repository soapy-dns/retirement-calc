import { Transfer, IScenario } from "@/app/lib/data/schema/config"

export const getScenarioTransfersForYear = (scenario: IScenario, year: number): Transfer[] => {
  const { transfers = [] } = scenario
  const transfersForYear = transfers.filter((it) => it.year === year)

  return transfersForYear
}
