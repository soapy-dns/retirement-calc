import { applyMandatedDrawdowns } from "../applyMandatedDrawdowns"
import { Asset } from "../../assets/Asset"
import { AutomatedDrawdown } from "../types"

describe("applyMandatedDrawdowns", () => {
  it("should apply drawdowns correctly", () => {
    const assets: Asset[] = [
      {
        id: "asset1",
        name: "Asset 1",
        history: [
          { year: 2022, value: 1000 },
          { year: 2023, value: 1000 }
        ]
      }
    ]

    const drawdowns: AutomatedDrawdown[] = [{ year: 2022, from: "asset1", value: 100 }]

    applyMandatedDrawdowns({ drawdowns, assets })

    expect(assets[0].history.find((h) => h.year === 2023)?.value).toBe(900)
  })

  it("should throw an error if asset is not found", () => {
    const assets: Asset[] = [
      {
        id: "asset1",
        name: "Asset 1",
        history: [
          { year: 2022, value: 1000 },
          { year: 2023, value: 1000 }
        ]
      }
    ]

    const drawdowns: AutomatedDrawdown[] = [{ year: 2022, from: "asset2", value: 100 }]

    expect(() => applyMandatedDrawdowns({ drawdowns, assets })).toThrow("asset not found asset2")
  })

  it("should throw an error if next history is not found", () => {
    const assets: Asset[] = [
      {
        id: "asset1",
        name: "Asset 1",
        history: [{ year: 2022, value: 1000 }]
      }
    ]

    const drawdowns: AutomatedDrawdown[] = [{ year: 2022, from: "asset1", value: 100 }]

    expect(() => applyMandatedDrawdowns({ drawdowns, assets })).toThrow("history cannot be found Asset 1, 2022")
  })
})
