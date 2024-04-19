import * as z from "zod"

// TODO: not currently used, but left for future reference.
const customErrorMap: z.ZodErrorMap = (error, ctx) => {
  /*

  If error.message is set, that means the user is trying to
  override the error message. This is how method-specific
  error overrides work, like this:

  z.string().min(5, { message: "TOO SMALL 🤬" })

  It is a best practice to return `error.message` if it is set.
  
  */
  console.log("error in custom map", error)
  if (error.message) return { message: error.message }

  /*
  This is where you override the various error codes
  */
  switch (error.code) {
    case z.ZodIssueCode.invalid_type:
      if (error.received === "undefined") {
        if (error.expected.indexOf("|") > 0) return { message: "A value must be selected." }
        return { message: `This field is required.` }
      } else {
        return { message: `Invalid value.` }
      }

      break
    // case z.ZodIssueCode.custom:
    //   // produce a custom message using error.params
    //   // error.params won't be set unless you passed
    //   // a `params` arguments into a custom validator
    //   const params = error.params || {}
    //   if (params.myField) {
    //     return { message: `Bad input: ${params.myField}` }
    //   }
    //   break
  }

  // fall back to default message!
  return { message: ctx.defaultError }
}

z.setErrorMap(customErrorMap)

export { z }
