import { getAssetRateOfReturn } from "../getAssetRateOfReturn"
import { AssetIncome } from "../assets/types"
import { Asset } from "../assets/Asset"

describe("getAssetRateOfReturn", () => {
  it("should return correct rate of return for given assets and income", () => {
    const incomeFromAssets: AssetIncome[] = [
      {
        assetId: "1",
        className: "AuSuper",
        history: [
          { year: 2020, value: 1000 },
          { year: 2021, value: 1500 }
        ]
      }
    ]

    const assets: Asset[] = [
      {
        id: "1",
        className: "AuSuper",
        history: [
          { year: 2020, value: 10000 },
          { year: 2021, value: 12000 }
        ]
      }
    ]

    const yearRange = [2020, 2021]

    const result = getAssetRateOfReturn({ incomeFromAssets, assets, yearRange })

    expect(result).toEqual([
      { year: 2020, value: 10 },
      { year: 2021, value: 12.5 }
    ])
  })

  //   it.only("should return 0 rate of return if there are no capital assets", () => {
  //     const incomeFromAssets: AssetIncome[] = [
  //       {
  //         assetId: "1",
  //         history: [
  //           { year: 2020, value: 1000 },
  //           { year: 2021, value: 1500 }
  //         ]
  //       }
  //     ]

  //     const assets: Asset[] = [
  //       {
  //         id: "1",
  //         className: "Salary",
  //         history: [
  //           { year: 2019, value: 10000 },
  //           { year: 2020, value: 12000 }
  //         ]
  //       }
  //     ]

  //     const yearRange = [2020, 2021]

  //     const result = getAssetRateOfReturn({ incomeFromAssets, assets, yearRange })
  //     console.log("--result--", result)

  //     expect(result).toEqual([
  //       { year: 2019, value: 0 },
  //       { year: 2020, value: 0 }
  //     ])
  //   })
})
