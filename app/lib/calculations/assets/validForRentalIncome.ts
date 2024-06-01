export const validForRentalIncome = (currentYear: number, startYear?: number, endYear?: number) => {
  if (!startYear && !endYear) {
    return true
  } else if (!startYear && endYear && currentYear < endYear) {
    return true
  } else if (startYear && !endYear && currentYear >= startYear) {
    return true
  } else if (startYear && endYear && currentYear >= startYear && currentYear < endYear) {
    return true
  } else {
    return false
  }
}
