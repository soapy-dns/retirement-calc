import { FormDataType, FormSchema } from ".."

jest.mock("../../../../../../../../lib/calculations/utils/getStartingYear", () => ({
  getStartingYear: () => 2024
}))

describe("", () => {
  it("should validate ok", () => {
    const livingExpensesData: FormDataType = {
      items: [
        { fromYear: 2024, amountInTodaysTerms: 100000 },
        { fromYear: 2025, amountInTodaysTerms: 50000 },
        { fromYear: 2026, amountInTodaysTerms: 0 },
        { fromYear: 2027, amountInTodaysTerms: 150000 }
      ]
    }

    const result = FormSchema.parse(livingExpensesData)
    // console.log("--result--", result)
    expect(result).toEqual(livingExpensesData)
  })

  // it("should fail because of fromYear before starting year", () => {
  //   const inflationData: FormDataType = {
  //     items: [{ fromYear: 2023, inflationRate: 3 }]
  //   }

  //   // TODO: make this better
  //   try {
  //     FormSchema.parse(inflationData)
  //   } catch (e) {
  //     expect(e).not.toBe(null)
  //     //   console.log("--e--", e.toString())
  //   }

  //   // console.log("--result.toString()--", result.toString())

  //   // expect(result.toString()).toEqual([
  //   //   {
  //   //     code: "custom",
  //   //     message: "2023 is in the past.",
  //   //     path: ["items", 0, "fromYear"]
  //   //   }
  //   // ])

  //   // expect(FormSchema.parse(inflationData)).toThrow()
  //   // let error
  //   // try {
  //   //   const result = FormSchema.parse(inflationData)
  //   // } catch (e) {
  //   //   console.log("--typeof e--", typeof e)
  //   //   console.log("--e--", e)
  //   //   error = e
  //   // }
  //   // const expectedZodError = [
  //   //   {
  //   //     code: "custom",
  //   //     message: "2023 is in the past.",
  //   //     path: ["items", 0, "fromYear"]
  //   //   }
  //   // ] as ZodError

  //   // expect(error).toEqual(expectedZodError)
  // })

  // it("should fail because no from years at starting year", () => {
  //   const inflationData: FormDataType = {
  //     items: [{ fromYear: 2025, inflationRate: 3 }]
  //   }

  //   // TODO: make this better
  //   try {
  //     FormSchema.parse(inflationData)
  //   } catch (e) {
  //     expect(e).not.toBe(null)
  //     //   console.log("--e--", e.toString())
  //   }
  // })
})
