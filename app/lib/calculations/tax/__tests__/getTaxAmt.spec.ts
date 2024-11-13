import { getTaxAmtForYear } from "../getTaxAmt"
import { EarningsTax, Tax } from "../../assets/types"

describe("getTaxAmtForYear", () => {
  it("should return the total tax amount for the given year", () => {
    const taxes: EarningsTax[] = [
      {
        ownerId: "HER",
        history: [
          { year: 2022, value: 1000 },
          { year: 2023, value: 1500 }
        ]
      },
      {
        ownerId: "HIM",
        history: [
          { year: 2022, value: 2000 },
          { year: 2023, value: 2500 }
        ]
      }
    ]

    const result = getTaxAmtForYear(taxes, 2022)
    expect(result).toBe(3000)
  })

  it("should return 0 if no taxes are found for the given year", () => {
    const taxes: EarningsTax[] = [
      {
        ownerId: "HER",
        history: [
          { year: 2021, value: 1000 },
          { year: 2023, value: 1500 }
        ]
      },
      {
        ownerId: "HIM",
        history: [
          { year: 2021, value: 2000 },
          { year: 2023, value: 2500 }
        ]
      }
    ]

    const result = getTaxAmtForYear(taxes, 2022)
    expect(result).toBe(0)
  })

  it("should handle an empty taxes array", () => {
    const taxes: EarningsTax[] = []

    const result = getTaxAmtForYear(taxes, 2022)
    expect(result).toBe(0)
  })

  it("should handle taxes with no history", () => {
    const taxes: EarningsTax[] = [
      {
        ownerId: "HER",
        history: []
      },
      {
        ownerId: "HIM",
        history: []
      }
    ]

    const result = getTaxAmtForYear(taxes, 2022)
    expect(result).toBe(0)
  })

  it("should handle mixed Tax and EarningsTax types", () => {
    const taxes: (Tax | EarningsTax)[] = [
      {
        history: [
          { year: 2022, value: 1000 },
          { year: 2023, value: 1500 }
        ]
      } as EarningsTax,
      {
        history: [
          { year: 2022, value: 2000 },
          { year: 2023, value: 2500 }
        ]
      } as Tax
    ]

    const result = getTaxAmtForYear(taxes, 2022)
    expect(result).toBe(3000)
  })
})
