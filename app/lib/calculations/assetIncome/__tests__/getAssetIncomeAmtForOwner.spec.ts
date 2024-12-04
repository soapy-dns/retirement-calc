import { getAssetIncomeAmtForOwner } from "../getAssetIncomeAmtForOwner"
import { OwnerType } from "../../../data/schema/config"
import { AssetIncome } from "../../assets/types"

describe("getAssetIncomeAmtForOwner", () => {
  it("should return the total income amount for the specified owner and year", () => {
    const owner: OwnerType = { identifier: "owner1" }
    const incomeFromAssets: AssetIncome[] = [
      {
        ownerId: "owner1",
        history: [
          { year: 2022, value: 1000 },
          { year: 2023, value: 1500 }
        ]
      },
      {
        ownerId: "owner2",
        history: [
          { year: 2022, value: 2000 },
          { year: 2023, value: 2500 }
        ]
      }
    ]
    const result = getAssetIncomeAmtForOwner({ year: 2022, incomeFromAssets, owner })
    expect(result).toBe(1000)
  })

  it("should return 0 if the owner has no income for the specified year", () => {
    const owner: OwnerType = { identifier: "owner1" }
    const incomeFromAssets: AssetIncome[] = [
      {
        ownerId: "owner1",
        history: [{ year: 2023, value: 1500 }]
      }
    ]
    const result = getAssetIncomeAmtForOwner({ year: 2022, incomeFromAssets, owner })
    expect(result).toBe(0)
  })

  it("should return 0 if the owner has no income from assets", () => {
    const owner: OwnerType = { identifier: "owner1" }
    const incomeFromAssets: AssetIncome[] = [
      {
        ownerId: "owner2",
        history: [{ year: 2022, value: 2000 }]
      }
    ]
    const result = getAssetIncomeAmtForOwner({ year: 2022, incomeFromAssets, owner })
    expect(result).toBe(0)
  })

  it("should handle multiple income entries for the same owner and year", () => {
    const owner: OwnerType = { identifier: "owner1" }
    const incomeFromAssets: AssetIncome[] = [
      {
        ownerId: "owner1",
        history: [{ year: 2022, value: 1000 }]
      },
      {
        ownerId: "owner1",
        history: [{ year: 2022, value: 500 }]
      }
    ]
    const result = getAssetIncomeAmtForOwner({ year: 2022, incomeFromAssets, owner })
    expect(result).toBe(1500)
  })
})
