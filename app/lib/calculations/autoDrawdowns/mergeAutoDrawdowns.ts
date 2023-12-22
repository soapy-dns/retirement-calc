import { AutomatedDrawdown } from "./types"

export const mergeAutoDrawdowns = (
  existingAutoDrawdowns: AutomatedDrawdown[],
  newAutoDrawdownsForYear: AutomatedDrawdown[]
) => {
  console.log("--existingAutoDrawdowns--", JSON.stringify(existingAutoDrawdowns, null, 4))

  let mergedAutoDrawdowns: AutomatedDrawdown[] = [...existingAutoDrawdowns]
  newAutoDrawdownsForYear.forEach((newDrawdown) => {
    const found = mergedAutoDrawdowns.find((existingDrawdown) => existingDrawdown.from === newDrawdown.from)
    if (found) {
      found.value = found.value + newDrawdown.value
    } else {
      mergedAutoDrawdowns.push(newDrawdown)
    }
  })
  console.log("--newAutoDrawdownsForYear--", newAutoDrawdownsForYear)
  console.log("--mergedAutoDrawdowns--", mergedAutoDrawdowns)
  return mergedAutoDrawdowns
}
