import data from "@/app/lib/data/lifeExpectancy.json"
import { getCurrentYear } from "../utils/getCurrentYear"
import { LifeExpectancyDetails } from "./types"
import { OwnerType } from "../../data/schema/config"

export type FullOwnerDetails = Partial<LifeExpectancyDetails> & OwnerType

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

export const getFullOwnerDetails = (owners: OwnerType[]): FullOwnerDetails[] => {
  const fullOwnersDetails = owners.map((owner: OwnerType) => {
    if (owner.birthYear && owner.gender) {
      const deathDetails = getExpectedDeathDetails(owner.birthYear, owner.gender)

      if (deathDetails) {
        const { deathAge, deathYear, yearsLeft } = deathDetails
        return { ...owner, deathYear, deathAge, yearsLeft }
      }
    }
    return { ...owner }
  })

  return fullOwnersDetails
}
