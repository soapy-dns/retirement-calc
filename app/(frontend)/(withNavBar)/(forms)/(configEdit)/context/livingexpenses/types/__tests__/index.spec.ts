import { ScenarioSchema } from "@/app/lib/data/schema/config"
import { FormDataType, getFormSchema } from ".."
import { generateMock } from "@anatine/zod-mock"

const mockScenarioConfig = generateMock(ScenarioSchema)
mockScenarioConfig.asAtYear = 2024

const FormSchema = getFormSchema(mockScenarioConfig)

describe("", () => {
  it("should validate ok", () => {
    const livingExpensesData: FormDataType = {
      items: [
        { fromYear: 2024, amountInTodaysTerms: 100000 },
        { fromYear: 2025, amountInTodaysTerms: 50000 },
        { fromYear: 2026, amountInTodaysTerms: 0 },
        { fromYear: 2027, amountInTodaysTerms: 150000 }
      ]
    }

    const result = FormSchema.parse(livingExpensesData)
    expect(result).toEqual(livingExpensesData)
  })
})
