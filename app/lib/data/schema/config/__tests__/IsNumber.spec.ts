import { IsFormNumber, IsFormNumberOpt } from "../schemaUtils"

describe("IsNumber schema validation", () => {
  it.each`
    input        | expected
    ${undefined} | ${false}
    ${1}         | ${true}
    ${"1"}       | ${true}
    ${"0"}       | ${true}
    ${""}        | ${false}
    ${"a"}       | ${false}
  `("should validate correctly (required)", ({ input, expected }) => {
    const result = IsFormNumber.safeParse(input)
    const { success, ...rest } = result

    if (success !== expected) {
      console.log("-- ERROR-> input, success, expected--", input, success, expected, result)
    }
    expect(success).toBe(expected)
  })

  it.each`
    input        | expected
    ${undefined} | ${true}
    ${1}         | ${true}
    ${"1"}       | ${true}
    ${"0"}       | ${true}
    ${""}        | ${true}
    ${"a"}       | ${false}
  `(`should validate optional number correctly`, ({ input, expected }) => {
    const result = IsFormNumberOpt.safeParse(input)
    const { success, ...rest } = result
    if (success !== expected) {
      console.log("--input, success, expected--", "*", input, "*", success, expected, JSON.stringify(result, null, 2))
    }

    expect(success).toBe(expected)
  })
})
