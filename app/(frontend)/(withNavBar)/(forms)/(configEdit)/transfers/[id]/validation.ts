import { Transfer } from "@/app/lib/data/schema/config"
import { FormDataType } from "./FormSchema"

export const testForMultipleMigrateAll = ({ from, year, migrateAll }: FormDataType, transfers: Transfer[] = []) => {
  if (migrateAll === "Y") {
    const isAnotherMigrateAllFrom = transfers?.find((it) => {
      return it.year === year && it.from === from && it.migrateAll
    })
    if (isAnotherMigrateAllFrom) return false
  }

  return true
}
