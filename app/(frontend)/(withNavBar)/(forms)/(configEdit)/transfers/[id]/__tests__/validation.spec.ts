import { Transfer } from "@/app/lib/data/schema/config"
import { FormDataType } from "../FormSchema"
import { testForMultipleMigrateAllFrom } from "../validation"

describe("testForMultipleMigrateAll", () => {
  it("should return true when add full transfer and no transfers exit", () => {
    const formData: FormDataType = { from: "A", to: "B", year: 2023, migrateAll: "Y" }
    const result = testForMultipleMigrateAllFrom(formData)
    expect(result).toBe(true)
  })

  it("should return false when add full transfer and full transfer exits", () => {
    const formData: FormDataType = { from: "A", to: "B", year: 2023, migrateAll: "Y" }
    const transfers: Transfer[] = [{ id: "A", from: "A", to: "C", year: 2023, migrateAll: true }]
    const result = testForMultipleMigrateAllFrom(formData, transfers)
    expect(result).toBe(false)
  })
})
