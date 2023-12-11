import { useFormState, Control } from "react-hook-form"

export function useError(control: Control<any, object>, fieldName: string): string {
  const { errors } = useFormState({ control })

  return errors[fieldName]?.message?.toString()
}
