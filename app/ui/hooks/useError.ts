import { useFormState, Control } from "react-hook-form"
import get from "lodash/get"

export function useError(control: Control<any, object>, fieldName: string): string | undefined {
  const { errors } = useFormState({ control })

  const error = get(errors, fieldName)

  return error?.message?.toString()
}
