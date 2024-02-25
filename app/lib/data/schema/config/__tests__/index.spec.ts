import { IsNumber } from ".."

describe("schema validation", () => {
  it.each`
    input        | expected
    ${undefined} | ${true}
    ${1}         | ${true}
    ${"1"}       | ${true}
    ${"0"}       | ${true}
    ${""}        | ${false}
    ${"a"}       | ${false}
  `("should validate correctly", ({ input, expected }) => {
    const result = IsNumber.safeParse(input)
    const { success, ...rest } = result
    // console.log("--rest--", rest)

    expect(success).toBe(expected)
  })
})
