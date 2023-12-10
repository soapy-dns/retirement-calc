import { Asset } from "../../assets/Asset"
import { sortByPreference } from "../sortAssetsByPreference"

describe("test", () => {
  it("should sort correctly", () => {
    const assetData1 = {
      name: "TEST1",
      incomeProducing: true,
      calculator: () => {},
      drawdownOrder: 10
    }
    const assetData2 = {
      name: "TEST2",
      incomeProducing: true,
      calculator: () => {},
      drawdownOrder: 1
    }

    const assets = [new Asset(assetData1), new Asset(assetData2)]
    const result = sortByPreference(assets)
    expect(result[0].drawdownOrder).toBe(1)
    expect(result[1].drawdownOrder).toBe(10)
  })
})
