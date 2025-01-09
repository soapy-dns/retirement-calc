import { getCurrentYear } from "@/app/lib/calculations/utils/getCurrentYear"
import { z } from "zod"

const castEmptyStringToUndefined = (val?: unknown) => (val !== "" ? val : undefined)

//  * Note: cannot use z.union([z.string(), z.number()]) because z.output / z.infer
//  * will be string or number.  Therefore I think we need to preprocess.
//  * coerce.number() coerces "" -> 0

// const IsFormNumberOpt = z.custom<{ arg: string }>((val) => {})
export const IsFormNumberOpt = z.preprocess(
  (val) => castEmptyStringToUndefined(val),
  z.coerce
    .number({
      invalid_type_error: "This value should be a number"
    })
    .optional()
)

export const IsFormNumber = z.preprocess((val) => castEmptyStringToUndefined(val), z.coerce.number())

// TODO: need to remove these hard coded values!!!
const validStartYear = 2020
const validEndYear = 2100

export const isValidYearBetween = (from: number, to: number) => {
  // return z.union([z.string(), z.number()]).refine(
  const currentYear = getCurrentYear()
  console.log("--currentYear--", currentYear)
  const fromX = currentYear
  const toX = currentYear + 100

  return z.coerce.number().refine(
    (val) => {
      console.log("--val, from, to - --", val, fromX, toX)
      // true means its valid
      if (Number.isNaN(val)) return false

      const value = Number(val)

      if (value >= fromX && value <= toX) return true

      return false
    },
    (val) => ({
      message: `The year ${val} is mandatory, and should be between ${fromX}, and ${toX}`
    })
  )
  // return z.custom<number>((val) => {
  //   if (Number.isNaN(val)) return false

  //   if (val >= from && val <= to) return true

  //   return false
  // })
}

// export const IsValidYear = z.union([z.string(), z.number()]).refine(
//   (val) => {
//     // true means its valid
//     if (Number.isNaN(val)) return false

//     const value = Number(val)

//     if (value >= validStartYear && value <= validEndYear) return true

//     return false
//   },
//   (val) => ({
//     message: `The year ${val} is not valid.  It should be a number between ${validStartYear}, and ${validEndYear}`
//   })
// )
// export const IsValidYear = z.preprocess(
//   (val) => castEmptyStringToUndefined(val),
//   z.coerce.number().refine(
//     (val) => val >= validStartYear && val <= validEndYear,
//     (val) => ({ message: `The year ${val} is not valid` })
//   )
// ).

export const IsOptionalValidYear = z.preprocess(
  (val) => castEmptyStringToUndefined(val),
  z.coerce
    .number()
    .optional()
    .refine(
      (val) => val === undefined || (val >= validStartYear && val <= validEndYear),
      (val) => ({ message: `The year ${val} is not valid` })
    )
)

// export const IsFutureOrCurrentYear = z.preprocess(
//   (val) => castEmptyStringToUndefined(val),
//   z.coerce.number().refine(
//     (val) => yearNotPassed(val),
//     (val) => ({ message: `${val} is in the past` })
//   )
// )

// export const IsOptionalFutureOrCurrentYear = z.preprocess(
//   (val) => castEmptyStringToUndefined(val),
//   z.coerce
//     .number()
//     .optional()
//     .refine(
//       (val) => val === undefined || yearNotPassed(val),
//       (val) => {
//         return val === 0
//           ? { message: "This value is required." }
//           : {
//               message: `${val} is in the past.`
//             }
//       }
//     )
// )

export const CountryEnum = z.enum(["AU", "SC", "EN", "WA", "NI"])
export const YesNoSchema = z.enum(["Y", "N"])
