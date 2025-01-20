import { getScenarioTransfersForYear } from "../transferUtils"
import { Transfer, IScenario } from "@/app/lib/data/schema/config"

describe("getScenarioTransfersForYear", () => {
  it("should return an empty array if there are no transfers", () => {
    const scenario: IScenario = { transfers: [] }
    const year = 2023
    const result = getScenarioTransfersForYear(scenario, year)
    expect(result).toEqual([])
  })

  it("should return an empty array if no transfers match the year", () => {
    const scenario: IScenario = {
      transfers: [{ year: 2022 }, { year: 2024 }]
    }
    const year = 2023
    const result = getScenarioTransfersForYear(scenario, year)
    expect(result).toEqual([])
  })

  it("should return transfers that match the year", () => {
    const scenario: IScenario = {
      transfers: [{ year: 2023 }, { year: 2023 }, { year: 2024 }]
    }
    const year = 2023
    const result = getScenarioTransfersForYear(scenario, year)
    expect(result).toEqual([{ year: 2023 }, { year: 2023 }])
  })

  it("should return an empty array if scenario has no transfers property", () => {
    const scenario: IScenario = {}
    const year = 2023
    const result = getScenarioTransfersForYear(scenario, year)
    expect(result).toEqual([])
  })
})
