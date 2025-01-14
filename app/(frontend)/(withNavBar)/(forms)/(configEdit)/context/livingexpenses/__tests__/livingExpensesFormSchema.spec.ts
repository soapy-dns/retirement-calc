import { ScenarioSchema } from "@/app/lib/data/schema/config"
import { FormDataType, getLivingExpensesFormSchema } from "../livingExpenseFormSchema"
import { generateMock } from "@anatine/zod-mock"

const asAtYear = 2024
const mockScenarioConfig = generateMock(ScenarioSchema)
mockScenarioConfig.asAtYear = asAtYear

const LivingExpensesSchema = getLivingExpensesFormSchema(mockScenarioConfig)

describe("", () => {
  // Fake timers using Jest
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date(asAtYear, 1, 1))
  })

  // Running all pending timers and switching to real timers using Jest
  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it("should validate ok", () => {
    const livingExpensesData: FormDataType = {
      items: [
        { fromYear: asAtYear, amountInTodaysTerms: 100000 },
        { fromYear: asAtYear + 1, amountInTodaysTerms: 50000 },
        { fromYear: asAtYear + 2, amountInTodaysTerms: 0 },
        { fromYear: asAtYear + 3, amountInTodaysTerms: 150000 }
      ]
    }

    const result = LivingExpensesSchema.parse(livingExpensesData)
    expect(result).toEqual(livingExpensesData)
  })
})
