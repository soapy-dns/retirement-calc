import { useFormState, Control, useFormContext } from "react-hook-form"
import get from "lodash/get"

export function useError(fieldName: string): string | undefined {
  const { control } = useFormContext()

  const { errors } = useFormState({ control })

  const error = get(errors, fieldName)

  return error?.message?.toString()
}
