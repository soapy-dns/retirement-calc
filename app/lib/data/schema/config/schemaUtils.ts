import { z } from "zod"
import { yearNotPassed } from "./validation"

const castEmptyStringToUndefined = (val?: unknown) => {
  return val !== "" ? val : undefined
}

export const IsOptionalNumber = z.preprocess((val) => castEmptyStringToUndefined(val), z.coerce.number().optional())
export const IsNumber = z.preprocess((val) => castEmptyStringToUndefined(val), z.coerce.number())

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
