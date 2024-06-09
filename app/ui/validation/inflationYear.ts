import { getStartingYear } from "@/app/lib/calculations/utils/getStartingYear"

const INVALID_INFLATION_RATE = "The inflation rate should be a number - 0.01 <-> 100%"
const REQUIRED_MSG = "Value is required."
const INVALID_YEAR = "The year should be 4 digits and not in the past"

// export const validateYear = (fieldToTest: string): string | boolean => {
//   const startingYear = getStartingYear()
//   if (Number.isNaN(fieldToTest)) return INVALID_YEAR

//   const year = Number(fieldToTest)
//   if (year < startingYear || year > 2100) return INVALID_YEAR

//   return true
// }

export const validateInflationRate = (fieldToTest: string): string | boolean => {
  if (Number.isNaN(fieldToTest)) return INVALID_INFLATION_RATE

  return true
}

// TODO: change name
// const yearValidationRules = {
//   required: REQUIRED_MSG,
//   validate: validateYear
// }

// const newInflationYearValidationRules = {
//   validate: validateYear
// }

const inflationRateValidationRules = {
  required: REQUIRED_MSG,
  validate: validateInflationRate
}

const newInflationRateValidationRules = {
  validate: validateInflationRate
}

// TODO: move to zod
export {
  // yearValidationRules as inflationYearValidationRules,
  // newInflationYearValidationRules,
  inflationRateValidationRules,
  newInflationRateValidationRules
}
