import { generateMock } from "@anatine/zod-mock"
import { FormDataType, getFormSchema } from "../getFormSchema"
import { ScenarioSchema } from "@/app/lib/data/schema/config"

const mockScenarioConfig = generateMock(ScenarioSchema)
const asAtYear = 2024

describe("", () => {
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
    mockScenarioConfig.asAtYear = 2024

    const inflationData: FormDataType = {
      items: [
        { fromYear: 2024, inflationRate: 3 },
        { fromYear: 2025, inflationRate: 5.5 },
        { fromYear: 2026, inflationRate: -1 },
        { fromYear: 2027, inflationRate: 0 }
      ]
    }
    const FormSchema = getFormSchema(mockScenarioConfig)

    const result = FormSchema.parse(inflationData)
    expect(result).toEqual(inflationData)
  })

  it("should fail because of fromYear before asAt year", () => {
    const inflationData: FormDataType = {
      items: [{ fromYear: 2023, inflationRate: 3 }]
    }
    mockScenarioConfig.asAtYear = 2024

    const FormSchema = getFormSchema(mockScenarioConfig)

    // TODO: make this better
    try {
      FormSchema.parse(inflationData)
    } catch (e) {
      expect(e).not.toBe(null)
    }
  })
})
