"use server"

import data from "@/app/lib/data/lifeExpectancy.json"
import { getCurrentYear } from "../utils/getCurrentYear"
import { LifeExpectancyDetails } from "./types"
import { OwnerType } from "../../data/schema/config"

// rather than being a server action, this should probably be done as part of the calculation - given
// that this information is required in the calculation, and updating the owners requires the calculation to be
// re-done anyway.
export type FullOwnerDetails = Partial<LifeExpectancyDetails> & OwnerType

export const getExpectedDeathDetails = async (
  birthYear: number,
  gender: "M" | "F"
): Promise<LifeExpectancyDetails | undefined> => {
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

export const getFullOwnerDetails = async (owners: OwnerType[]): Promise<FullOwnerDetails[]> => {
  const fullOwnersDetails = await Promise.all(
    owners.map(async (owner: OwnerType) => {
      // if (owner.birthYear && owner.gender) {
      const deathDetails = await getExpectedDeathDetails(owner.birthYear, owner.gender)

      if (deathDetails) {
        const { deathAge, deathYear, yearsLeft } = deathDetails
        return { ...owner, deathYear, deathAge, yearsLeft }
      }
      // }
      return { ...owner }
    })
  )

  return fullOwnersDetails
}
