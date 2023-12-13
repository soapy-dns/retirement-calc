const INVALID_OWNERS = "An asset must have an owner"

export const validateOwners = (field: string[]) => {
  if (field.length > 0) return true
  return INVALID_OWNERS
}

const ownerValidationRules = {
  validate: validateOwners
}

export { ownerValidationRules }
