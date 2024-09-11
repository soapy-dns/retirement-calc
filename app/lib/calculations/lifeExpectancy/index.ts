import data from "@/app/lib/data/lifeExpectancy.json"
import { getCurrentYear } from "../utils/getCurrentYear"
import { LifeExpectancyDetails } from "./types"

export const getExpectedDeathDetails = (birthYear: number, gender: "M" | "F"): LifeExpectancyDetails | undefined => {
  const thisYear = getCurrentYear()
  const roughAge = thisYear - birthYear

  const foundRow = data.find((it) => {
    return it.age === roughAge
  })
  if (foundRow) {
    const lifeExpectancy = Math.ceil(foundRow[gender])
    const expectedDeathAge = roughAge + lifeExpectancy
    const expectedDeathYear = thisYear + lifeExpectancy
    const yearsLeft = expectedDeathYear - thisYear
    return { deathAge: expectedDeathAge, deathYear: expectedDeathYear, yearsLeft }
  }
  return
}
