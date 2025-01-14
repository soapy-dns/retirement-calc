import { AssetData } from "../../types"
import { withData } from "../withData"

describe("withData test", () => {
  it("should only return records which contain values", () => {
    const assetDataWith: AssetData = {
      test1: [
        { year: 2024, value: 1000 },
        { year: 2025, value: 2000 }
      ],
      test2: [
        { year: 2024, value: 0 },
        { year: 2025, value: 2000 }
      ]
    }

    const assetDataWithout: AssetData = {
      test3: [
        { year: 2024, value: 0 },
        { year: 0, value: 0 }
      ],
      test4: []
    }
    const result = withData({ ...assetDataWith, ...assetDataWithout })

    expect(result).toEqual(assetDataWith)
  })
})
