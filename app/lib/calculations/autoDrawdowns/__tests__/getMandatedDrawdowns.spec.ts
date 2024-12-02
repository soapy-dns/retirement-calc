import { getMandatedDrawdowns } from "../getMandatedDrawdowns"
import { Asset } from "../../assets/Asset"
import { OwnersType } from "../../../data/schema/config"
import { AutomatedDrawdown } from "../types"
import { Constants } from "../../constants"

jest.mock("../../../utils/getRandomKey", () => ({
  getRandomKey: jest.fn().mockReturnValue("randomKey")
}))

jest.mock("../../../config.json", () => {
  return {
    mandatoryDrawdownPercentages: {
      AU: [
        { ageTo: 65, percentage: 4 },
        { ageTo: 75, percentage: 5 },
        { ageTo: 85, percentage: 6 }
      ]
    }
  }
})

describe("getMandatedDrawdowns", () => {
  it("should return an empty array if no assets require drawdowns", () => {
    const assets: Asset[] = []
    const owners: OwnersType = []
    const year = 2023

    const result = getMandatedDrawdowns({ assets, owners, year })

    expect(result).toEqual([])
  })

  it("should calculate the correct drawdown for an asset", () => {
    const assets: Asset[] = [
      {
        id: "asset1",
        name: "Super Fund",
        country: "AU",
        className: "AuSuper",
        ownerIds: ["owner1"],
        history: [{ year: 2023, value: 100000 }]
      }
    ]
    const owners: OwnersType = [{ identifier: "owner1", birthYear: 1960 }]
    const year = 2023

    const result = getMandatedDrawdowns({ assets, owners, year })

    const expected: AutomatedDrawdown[] = [
      {
        id: "randomKey",
        year: 2023,
        from: "asset1",
        fromName: "Super Fund",
        to: Constants.DRAWDOWN,
        value: 4000,
        migrateAll: false
      }
    ]

    expect(result).toEqual(expected)
  })

  it("should handle multiple assets and owners", () => {
    const assets: Asset[] = [
      {
        id: "asset1",
        name: "Super Fund 1",
        country: "AU",
        className: "AuSuper",
        ownerIds: ["owner1"],
        history: [{ year: 2023, value: 100000 }]
      },
      {
        id: "asset2",
        name: "Super Fund 2",
        country: "AU",
        className: "AuSuper",
        ownerIds: ["owner2"],
        history: [{ year: 2023, value: 200000 }]
      }
    ]
    const owners: OwnersType = [
      { identifier: "owner1", birthYear: 1960 },
      { identifier: "owner2", birthYear: 1950 }
    ]
    const year = 2023

    const result = getMandatedDrawdowns({ assets, owners, year })

    const expected: AutomatedDrawdown[] = [
      {
        id: "randomKey",
        year: 2023,
        from: "asset1",
        fromName: "Super Fund 1",
        to: Constants.DRAWDOWN,
        value: 4000,
        migrateAll: false
      },
      {
        id: "randomKey",
        year: 2023,
        from: "asset2",
        fromName: "Super Fund 2",
        to: Constants.DRAWDOWN,
        value: 10000,
        migrateAll: false
      }
    ]

    expect(result).toEqual(expected)
  })
})
