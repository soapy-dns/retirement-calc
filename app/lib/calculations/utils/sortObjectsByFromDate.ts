interface ObjectWithFromDate {
  fromYear: number
}

export const sortByFromDate = <T extends ObjectWithFromDate>(rows: T[]) => {
  rows.sort((a, b) => {
    if (a.fromYear > b.fromYear) return 1
    if (a.fromYear < b.fromYear) return -1
    return 0
  })

  return rows // rows are actually sorted in place but this helps testing
}
