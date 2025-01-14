import { Transfer } from "@/app/lib/data/schema/config"
import { FormDataType } from "../getTransferFormSchema"
import { testForMultipleMigrateAllFrom, testForMultipleMigrateAllFromAndTo } from "../validation"

describe("testForMultipleMigrateAllFrom", () => {
  it("should return true when add full transfer and no transfers exit", () => {
    const formData: FormDataType = { from: "A", to: "B", year: 2023, migrateAll: "Y" }
    const result = testForMultipleMigrateAllFrom(formData)
    expect(result).toBe(true)
  })

  it("should return false when add full transfer and another full transfer from this asset exits", () => {
    const formData: FormDataType = { from: "A", to: "B", year: 2023, migrateAll: "Y" }
    const transfers: Transfer[] = [{ id: "A", from: "A", to: "C", year: 2023, migrateAll: true }]
    const result = testForMultipleMigrateAllFrom(formData, transfers)
    expect(result).toBe(false)
  })

  it("should return false when add full transfer and another full transfer to this asset exits", () => {
    const formData: FormDataType = { from: "A", to: "B", year: 2023, migrateAll: "Y" }
    const transfers: Transfer[] = [{ id: "B", from: "B", to: "C", year: 2023, migrateAll: true }]
    const result = testForMultipleMigrateAllFromAndTo(formData, transfers)
    expect(result).toBe(false)
  })
})
