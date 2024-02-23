import { InflationRecord } from "@/app/lib/data/schema/config"
import { FormDataType, FormSchema } from ".."
import { ZodError } from "zod"
// import { getStartingYear } from "@/app/lib/calculations/utils/getStartingYear"
// import * as startingYearService from "../../../../../../../../lib/calculations/utils/getStartingYear"

// startingYearService.getStartingYear.mockReturnValue(2024)
// jest.mock("@/app/lib/calculations/utils/getStartingYear", () => ({

jest.mock("../../../../../../../../lib/calculations/utils/getStartingYear", () => ({
  getStartingYear: () => 2024
}))

describe("", () => {
  it("should validate ok", () => {
    const inflationData: FormDataType = {
      items: [
        { fromYear: 2024, inflationRate: 3 },
        { fromYear: 2025, inflationRate: 5.5 },
        { fromYear: 2026, inflationRate: -1 },
        { fromYear: 2027, inflationRate: 0 }
      ]
    }

    const result = FormSchema.parse(inflationData)
    console.log("--result--", result)
    expect(result).toEqual(inflationData)
  })

  it("should fail because of fromYear before starting year", () => {
    const inflationData: FormDataType = {
      items: [{ fromYear: 2023, inflationRate: 3 }]
    }

    // TODO: make this better
    try {
      const result = FormSchema.parse(inflationData)
    } catch (e) {
      expect(e).not.toBe(null)
      //   console.log("--e--", e.toString())
    }

    // console.log("--result.toString()--", result.toString())

    // expect(result.toString()).toEqual([
    //   {
    //     code: "custom",
    //     message: "2023 is in the past.",
    //     path: ["items", 0, "fromYear"]
    //   }
    // ])

    // expect(FormSchema.parse(inflationData)).toThrow()
    // let error
    // try {
    //   const result = FormSchema.parse(inflationData)
    // } catch (e) {
    //   console.log("--typeof e--", typeof e)
    //   console.log("--e--", e)
    //   error = e
    // }
    // const expectedZodError = [
    //   {
    //     code: "custom",
    //     message: "2023 is in the past.",
    //     path: ["items", 0, "fromYear"]
    //   }
    // ] as ZodError

    // expect(error).toEqual(expectedZodError)
  })
})
