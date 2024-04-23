import { z } from "zod"
import { yearNotPassed } from "./validation"

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

export const IsFutureOrCurrentYear = z.preprocess(
  (val) => castEmptyStringToUndefined(val),
  z.coerce.number().refine(
    (val) => yearNotPassed(val),
    (val) => ({ message: `${val} is in the past` })
  )
)

export const IsOptionalFutureOrCurrentYear = z.preprocess(
  (val) => castEmptyStringToUndefined(val),
  z.coerce
    .number()
    .optional()
    .refine(
      (val) => val === undefined || yearNotPassed(val),
      (val) => {
        return val === 0
          ? { message: "This value is required." }
          : {
              message: `${val} is in the past.`
            }
      }
    )
)

export const CountryEnum = z.enum(["AU", "SC"])
export const YesNoSchema = z.enum(["Y", "N"])
