import { DrawdownYearData } from "../../types"
import { getAutoDrawdownCellData } from "../getAutoDrawdownCellData"

const totalDrawdowns: DrawdownYearData[] = [
  {
    year: 2040,
    value: 208900,
    autoDrawdownAmt: 208900,
    automatedDrawdowns: [
      {
        id: "6d47fd57-5a8d-44d1-bbbc-1ff85cf70d01",
        year: 2040,
        from: "JOINT_AU_BANK",
        fromName: "Joint Au bank accounts",
        to: "DRAWDOWN",
        value: 100,
        migrateAll: false
      },
      {
        id: "c9a5948c-61f1-46e6-ae85-c37de0ea3a97",
        year: 2040,
        from: "HER_UK_SUPER",
        fromName: "Her Uk pension",
        to: "DRAWDOWN",
        value: 200,
        migrateAll: false
      }
    ]
  },
  {
    year: 2041,
    value: 213227,
    autoDrawdownAmt: 213227,
    automatedDrawdowns: [
      {
        id: "981597cf-43f0-42e2-9c5a-5dc7448c7839",
        year: 2041,
        from: "JOINT_AU_BANK",
        fromName: "Joint Au bank accounts",
        to: "DRAWDOWN",
        value: 400,
        migrateAll: false
      },
      {
        id: "5b97d10b-4ec2-4abf-9674-c64aec2eab46",
        year: 2041,
        from: "HIS_UK_SUPER",
        fromName: "His Uk pension",
        to: "DRAWDOWN",
        value: 800,
        migrateAll: false
      }
    ]
  }
]

const yearRange = [2039, 2040, 2041, 2042]

describe("test", () => {
  it("should get correctly formatted data", () => {
    const result = getAutoDrawdownCellData(totalDrawdowns, yearRange)

    const expectedResult = {
      "Joint Au bank accounts": [
        { year: 2039, value: 0 },
        { year: 2040, value: 100 },
        { year: 2041, value: 400 },
        { year: 2042, value: 0 }
      ],
      "Her Uk pension": [
        { year: 2039, value: 0 },
        { year: 2040, value: 200 },
        { year: 2041, value: 0 },
        { year: 2042, value: 0 }
      ],
      "His Uk pension": [
        { year: 2039, value: 0 },
        { year: 2040, value: 0 },
        { year: 2041, value: 800 },
        { year: 2042, value: 0 }
      ]
    }
    expect(result).toEqual(expectedResult)
  })
})
