import { validForRentalIncome } from "../validForRentalIncome"

describe("validForRentalIncome", () => {
  it.each`
    currentYear | startYear    | endYear      | expectedResult
    ${2022}     | ${2023}      | ${2025}      | ${false}
    ${2023}     | ${2023}      | ${2025}      | ${true}
    ${2024}     | ${2023}      | ${2025}      | ${true}
    ${2025}     | ${2023}      | ${2025}      | ${false}
    ${2026}     | ${2023}      | ${2025}      | ${false}
    ${2024}     | ${undefined} | ${undefined} | ${true}
    ${2022}     | ${2023}      | ${undefined} | ${false}
  `(`should return true if between`, ({ currentYear, startYear, endYear, expectedResult }) => {
    const result = validForRentalIncome(currentYear, startYear, endYear)

    expect(result).toBe(expectedResult)
  })
})
