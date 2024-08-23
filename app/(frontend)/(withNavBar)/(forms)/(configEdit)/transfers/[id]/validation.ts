import { Transfer } from "@/app/lib/data/schema/config"
import { FormDataType } from "./FormSchema"

/*
 A -> B and B -> C BAD - tested by testForMultipleMigrateAllFromAndTo
 A -> B and A -> C BAD - Tested by testForMultipleMigrateAllFrom
 A -> B and B -> C GOOD
*/

export const testForMultipleMigrateAllFrom = (
  { from, year, migrateAll }: FormDataType,
  transfers: Transfer[] = []
): boolean => {
  if (migrateAll === "Y") {
    const isAnotherMigrateAllFrom = transfers?.find((existingTransfer) => {
      return existingTransfer.year === year && existingTransfer.from === from && existingTransfer.migrateAll
    })
    if (isAnotherMigrateAllFrom) return false
  }

  return true
}

export const testForMultipleMigrateAllFromAndTo = (
  { to, year, migrateAll }: FormDataType,
  transfers: Transfer[] = []
): boolean => {
  if (migrateAll === "Y") {
    const isAnotherMigrateAllFrom = transfers?.find((existingTransfer) => {
      return existingTransfer.year === year && existingTransfer.from === to && existingTransfer.migrateAll
    })
    if (isAnotherMigrateAllFrom) return false
  }

  return true
}
