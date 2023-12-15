import { useFormState, Control } from "react-hook-form"

export function useError(control: Control<any, object>, fieldName: string): string | undefined {
  const { errors } = useFormState({ control })

  return errors[fieldName] ? errors[fieldName]?.message?.toString() : undefined
}
