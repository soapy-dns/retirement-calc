import React from "react"
import { screen } from "@testing-library/dom"
import { act, render, waitFor } from "@testing-library/react"

import LivingExpensesPage from "../page"
import { ScenarioProvider } from "@/app/ui/context/ScenarioProvider"
import { HelpModalProvider } from "@/app/ui/context/HelpModalProvider"
import { generateMock } from "@anatine/zod-mock"
import { ScenarioSchema } from "@/app/lib/data/schema/config"
import { getDefaultScenarios } from "@/app/lib/data/scenarios"

const defaultScenarios = getDefaultScenarios()

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
const mockScenarioConfig = generateMock(ScenarioSchema)
mockScenarioConfig.asAtYear = 2024

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
  })
})
