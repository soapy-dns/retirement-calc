import { IsNumber } from ".."

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
    const result = IsNumber.safeParse(input)
    const { success, ...rest } = result
    // console.log("--rest--", rest)

    expect(success).toBe(expected)
  })

  it.each`
    input        | expected
    ${undefined} | ${true}
    ${1}         | ${true}
    ${"1"}       | ${true}
    ${"0"}       | ${true}
    ${""}        | ${false}
    ${"a"}       | ${false}
  `("should validate correctly - optional", ({ input, expected }) => {
    const result = IsNumber.optional().safeParse(input)
    const { success, ...rest } = result
    console.log("--rest--", rest)

    expect(success).toBe(expected)
  })
})
