export const genderOptions = [
  {
    label: "Male",
    value: "M"
  },
  {
    label: "Female",
    value: "F"
  }
]

export const getGenderLabel = (value: string) => genderOptions.find((it) => it.value === value)?.label || "unknown"
