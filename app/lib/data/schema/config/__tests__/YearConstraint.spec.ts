import { z } from "zod"
import { getStartingYear } from "@/app/lib/calculations/utils/getStartingYear"
import { IsFutureOrCurrentYear, IsOptionalFutureOrCurrentYear } from ".."
// import { IsFutureOrCurrentYear } from ".."

// describe("IsFutureOrCurrentYear schema validation", () => {
//   it.each`
//     input        | expected
//     ${undefined} | ${true}
//   `(`should validate year correctly.`, ({ input, expected }) => {
//     const result = IsFutureOrCurrentYear.safeParse(input)
//     const { success, ...rest } = result
//     console.log("--input / expected--", input / expected)
//     console.log("--rest--", rest)

//     expect(success).toBe(expected)
//   })
// })

describe("IsFutureYear", () => {
  it.each`
    input                    | expected
    ${undefined}             | ${false}
    ${1}                     | ${false}
    ${0}                     | ${false}
    ${""}                    | ${false}
    ${getStartingYear()}     | ${true}
    ${getStartingYear() - 1} | ${false}
    ${getStartingYear() + 1} | ${true}
  `(`should validate year correctly.`, ({ input, expected }) => {
    const result = IsFutureOrCurrentYear.safeParse(input)
    const { success, ...rest } = result
    // console.log("--input / expected--", input / expected)
    // console.log("--rest--", rest)

    expect(success).toBe(expected)
  })

  it.each`
    input                    | expected
    ${undefined}             | ${true}
    ${""}                    | ${true}
    ${1}                     | ${false}
    ${0}                     | ${false}
    ${getStartingYear()}     | ${true}
    ${getStartingYear() - 1} | ${false}
    ${getStartingYear() + 1} | ${true}
  `(`should validate year correctly.`, ({ input, expected }) => {
    const result = IsOptionalFutureOrCurrentYear.safeParse(input)
    const { success, ...rest } = result
    // console.log("--input / expected--", input / expected)
    // console.log("--rest--", rest)

    expect(success).toBe(expected)
  })
})
