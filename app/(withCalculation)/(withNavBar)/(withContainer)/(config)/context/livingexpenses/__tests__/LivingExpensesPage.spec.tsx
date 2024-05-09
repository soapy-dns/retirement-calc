import React from "react"
import { screen } from "@testing-library/dom"
import { act, fireEvent, render, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { scenarios as defaultScenarios } from "@/app/lib/data/scenarios"

import LivingExpensesPage from "../page"
import { ScenarioProvider } from "@/app/ui/context/ScenarioProvider"
import { HelpModalProvider } from "@/app/ui/context/HelpModalProvider"

const goBack = jest.fn()
const onToggle = jest.fn()
const updateScenario = jest.fn()

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: () => ({
    showModal: false,
    onToggle: onToggle,
    selectedScenario: defaultScenarios[0],
    updateScenario
  })
}))

jest.mock("../../../../../../../ui/hooks/useNavigation", () => ({
  // jest.mock("@/app/ui/hooks/useNavigation", () => ({
  useNavigation: () => {
    return { goBack }
  }
}))

describe("Living expenses edit page", () => {
  it("should render ok", async () => {
    render(
      <HelpModalProvider>
        <ScenarioProvider>
          <LivingExpensesPage />
        </ScenarioProvider>
      </HelpModalProvider>
    )

    await waitFor(() => {
      const backButton = screen.getByText("Back to main context")
      backButton.click()
      expect(goBack).toHaveBeenCalledTimes(1)

      //header
      screen.getByText("Edit estimated living expenses")
    })

    const addButton = screen.getByText("Add a new row")

    await act(() => addButton.click())
    expect(onToggle).toHaveBeenCalledTimes(1)

    // screen.getByPlaceholderText("Add a year")

    // screen.getByDisplayValue("2024")

    // const firstYearInput = screen.getByDisplayValue("2024")
    // const value = "2023"

    // await act(() =>
    //   fireEvent.change(firstYearInput, {
    //     target: {
    //       value
    //     }
    //   })
    // )

    // const updatedFirstYearInput = screen.getByDisplayValue("2023")
  })
})
