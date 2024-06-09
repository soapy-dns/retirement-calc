import { IsValidYear, IsOptionalValidYear } from "../schemaUtils"

describe("IsValidYear", () => {
  it.each`
    input        | expected
    ${undefined} | ${false}
    ${2019}      | ${false}
    ${2020}      | ${true}
    ${2050}      | ${true}
    ${2051}      | ${false}
    ${""}        | ${false}
  `(`should validate year correctly.`, ({ input, expected }) => {
    const result = IsValidYear.safeParse(input)
    const { success, ...rest } = result

    if (success !== expected) {
      console.log(`${input} did not validate as expected ${expected}`)
    }

    expect(success).toBe(expected)
  })

  it.only.each`
    input        | expected
    ${undefined} | ${true}
    ${2019}      | ${false}
    ${2020}      | ${true}
    ${2100}      | ${true}
    ${2101}      | ${false}
    ${""}        | ${true}
  `(`should validate optional year correctly.`, ({ input, expected }) => {
    const result = IsOptionalValidYear.safeParse(input)
    const { success, ...rest } = result

    if (success !== expected) {
      console.log(`${input} did not validate as expected ${expected}`)
    }

    expect(success).toBe(expected)
  })
})
