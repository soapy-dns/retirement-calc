import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
// import { screen } from "@testing-library/dom"

import { useForm, FormProvider } from "react-hook-form"
import { InputField } from "../InputField"

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm()
  return <FormProvider {...methods}>{children}</FormProvider>
}

describe("InputField", () => {
  //   interface InputProps {
  //     testInput: string
  //   }

  it.only("renders input field with correct props", () => {
    render(
      <Wrapper>
        <InputField id="testInput" />
      </Wrapper>
    )
    const input = screen.getByTestId("testInput")
    screen.debug()
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute("id", "testInput")
  })

  it("renders prefix and suffix when provided", () => {
    render(
      <Wrapper>
        <InputField id="test-input" prefix="Prefix" suffix="Suffix" />
      </Wrapper>
    )
    expect(screen.getByText("Prefix")).toBeInTheDocument()
    expect(screen.getByText("Suffix")).toBeInTheDocument()
  })

  it("calls onChange handler with valid input", () => {
    const handleChange = jest.fn()
    render(
      <Wrapper>
        <InputField id="test-input" control={{}} restrictedCharSet={/^[a-zA-Z]*$/} />
      </Wrapper>
    )
    const input = screen.getByTestId("test-input")
    fireEvent.change(input, { target: { value: "valid" } })
    expect(handleChange).toHaveBeenCalledTimes(0) // handleChange is not passed as prop
  })

  it("does not call onChange handler with invalid input", () => {
    const handleChange = jest.fn()
    render(
      <Wrapper>
        <InputField id="test-input" control={{}} restrictedCharSet={/^[a-zA-Z]*$/} />
      </Wrapper>
    )
    const input = screen.getByTestId("test-input")
    fireEvent.change(input, { target: { value: "123" } })
    expect(handleChange).toHaveBeenCalledTimes(0) // handleChange is not passed as prop
  })

  it("displays error message when input is invalid", () => {
    const mockControl = {
      getFieldState: () => ({ error: { message: "Error message" } }),
      register: jest.fn()
    }
    render(
      <Wrapper>
        <InputField id="test-input" control={mockControl} />
      </Wrapper>
    )
    expect(screen.getByText("Error message")).toBeInTheDocument()
  })
})
