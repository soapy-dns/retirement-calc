import React from "react"
import { screen } from "@testing-library/dom"
import { act, render, waitFor } from "@testing-library/react"

import LivingExpensesPage from "../page"
import { HelpModalContext } from "@/app/ui/context/HelpModalProvider"
import { generateMock } from "@anatine/zod-mock"
import { ScenarioSchema } from "@/app/lib/data/schema/config"
import { getDefaultScenarios } from "@/app/lib/data/scenarios"
import { ScenarioContext } from "@/app/ui/context/scenario/ScenarioContext"
import { forEach } from "lodash"
import { ProviderWrapper } from "@/app/ui/testing/ProviderWrappers"

const goBack = jest.fn()
const onToggle = jest.fn()
const showModal = false
const modalData = {}

const updateScenario = jest.fn()

// const showCalculationInfo = jest.fn()

jest.mock("../../../../../../../ui/hooks/useNavigation", () => ({
  // jest.mock("@/app/ui/hooks/useNavigation", () => ({
  useNavigation: () => {
    return { goBack }
  }
}))

const mockScenarioConfig = generateMock(ScenarioSchema)
mockScenarioConfig.asAtYear = 2024
mockScenarioConfig.context.livingExpenses = [
  {
    fromYear: 2024,
    amountInTodaysTerms: 80001
  },
  {
    fromYear: 2038,
    amountInTodaysTerms: 50000
  }
]

describe("Living expenses edit page", () => {
  it("should render ok", async () => {
    render(
      <ProviderWrapper
        selectedScenario={mockScenarioConfig}
        onToggle={onToggle}
        showModal={showModal}
        modalData={modalData}
      >
        <LivingExpensesPage />
      </ProviderWrapper>
    )

    // screen.debug()

    await waitFor(() => {
      // check years entered properly
      const years = screen.getAllByPlaceholderText("Add a year")
      expect(years).toHaveLength(3)
      // third year is the modal...  There must be a better way to do this
      forEach(years, (year, index) => {
        const val = ["2024", "2038", ""][index]
        expect(year).toHaveAttribute("value", val)
      })

      // check amounts entered properly
      const amounts = screen.getAllByPlaceholderText("Add an amount")
      expect(amounts).toHaveLength(3)
      forEach(amounts, (amount, index) => {
        // third values is the modal...  There must be a better way to do this
        const val = ["80001", "50000", ""][index]
        expect(amount).toHaveAttribute("value", val)
      })

      const backButton = screen.getByText("Back to main context")

      backButton.click()
      expect(goBack).toHaveBeenCalledTimes(1)

      //header
      screen.getByText("Edit estimated living expenses")
    })

    const addButton = screen.getByText("Add a new row")

    await act(() => addButton.click())
    expect(onToggle).toHaveBeenCalledTimes(1)
  })
})
