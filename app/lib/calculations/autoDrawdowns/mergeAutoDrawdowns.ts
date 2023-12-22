import { AutomatedDrawdown } from "./types"

export const mergeAutoDrawdowns = (
  existingAutoDrawdowns: AutomatedDrawdown[],
  newAutoDrawdownsForYear: AutomatedDrawdown[]
) => {
  let mergedAutoDrawdowns: AutomatedDrawdown[] = [...existingAutoDrawdowns]
  newAutoDrawdownsForYear.forEach((newDrawdown) => {
    const found = mergedAutoDrawdowns.find((existingDrawdown) => existingDrawdown.from === newDrawdown.from)
    if (found) {
      found.value = found.value + newDrawdown.value
    } else {
      mergedAutoDrawdowns.push(newDrawdown)
    }
  })

  return mergedAutoDrawdowns
}
