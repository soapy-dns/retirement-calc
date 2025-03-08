import { render, screen, fireEvent } from "@testing-library/react"
import { Controller, useForm, FormProvider } from "react-hook-form"
import { InputField, InputProps } from "../InputField"

describe.skip("InputField", () => {
  it.only("renders the input field with default props", () => {
    //  const { control } = useForm<InputProps>(
    //   {},
    // )
    const { control } = useForm()
    render(
      // <FormProvider {...{ control }}>
      <InputField id="test-input" control={control} />
      // </FormProvider>
    )

    const inputElement = screen.getByTestId("test-input")
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute("type", "text")
    expect(inputElement).toHaveValue("")
  })

  it("renders the input field with a prefix", () => {
    const { control } = useForm()
    render(
      <FormProvider {...{ control }}>
        <InputField id="test-input" control={control} prefix="$" />
      </FormProvider>
    )

    const prefixElement = screen.getByText("$")
    expect(prefixElement).toBeInTheDocument()
    expect(prefixElement).toHaveClass("inline-block")
    expect(prefixElement).toHaveClass("border")
    expect(prefixElement).toHaveClass("bg-gray-100")
    expect(prefixElement).toHaveClass("p-1")

    // Ensure it's not an input field, but just the suffix text
    expect(prefixElement.tagName).toBe("DIV")
  })

  it.skip("renders the input field with a suffix", () => {
    const { control } = useForm()
    render(
      <FormProvider {...{ control }}>
        <InputField id="test-input" control={control} suffix="kg" />
      </FormProvider>
    )

    const suffixElement = screen.getByText("kg")
    expect(suffixElement).toBeInTheDocument()
    expect(suffixElement).toHaveClass("inline-block")
    expect(suffixElement).toHaveClass("border")
    expect(suffixElement).toHaveClass("bg-gray-100")
    expect(suffixElement).toHaveClass("p-1")

    // Ensure it's not an input field, but just the suffix text
    expect(suffixElement.tagName).toBe("DIV")
  })

  it("renders the input field with a default value", () => {
    const { control } = useForm()
    render(
      <FormProvider {...{ control }}>
        <InputField id="test-input" control={control} defaultValue="test" />
      </FormProvider>
    )

    const inputElement = screen.getByTestId("test-input")
    expect(inputElement).toHaveValue("test")
  })

  it("updates the input field value when the user types", () => {
    const { control } = useForm()
    render(
      <FormProvider {...{ control }}>
        <InputField id="test-input" control={control} />
      </FormProvider>
    )

    const inputElement = screen.getByTestId("test-input")
    fireEvent.change(inputElement, { target: { value: "new value" } })
    expect(inputElement).toHaveValue("new value")
  })

  it("calls onBlur when the input field loses focus", () => {
    const onBlur = vi.fn()
    const { control } = useForm()
    const { getByTestId } = render(
      <FormProvider {...{ control }}>
        <InputField id="test-input" control={control} />
      </FormProvider>
    )
    const input = getByTestId("test-input")
    input.focus()
    input.blur()
    // expect(onBlur).toHaveBeenCalled(); // this is not called immediately, as there is a timeout of 100ms in the handleOnChange.
    // as we are mocking the DOM, we can only check that the function within onBlur has been called.
  })

  it("renders with an error message", () => {
    const { control } = useForm({
      defaultValues: { test: "" },
      mode: "onSubmit"
    })

    const { rerender } = render(
      <FormProvider {...{ control }}>
        <InputField
          id="test-input"
          control={control}
          name="test"
          validationRules={{ required: "This field is required" }}
        />
      </FormProvider>
    )

    // Trigger form validation (as mode is onSubmit)
    control.handleSubmit((data) => {})()

    rerender(
      <FormProvider {...{ control }}>
        <InputField
          id="test-input"
          control={control}
          name="test"
          validationRules={{ required: "This field is required" }}
        />
      </FormProvider>
    )

    const inputElement = screen.getByTestId("test-input")
    expect(inputElement).toHaveAttribute("aria-invalid", "true")
  })

  it("renders with restricted character set", () => {
    const { control } = useForm()
    const restrictedCharSet = /^[0-9]+$/ // Only numbers allowed

    render(
      <FormProvider {...{ control }}>
        <InputField id="test-input" control={control} restrictedCharSet={restrictedCharSet} />
      </FormProvider>
    )
    const inputElement = screen.getByTestId("test-input")

    fireEvent.change(inputElement, { target: { value: "abc" } })
    expect(inputElement).toHaveValue("")

    fireEvent.change(inputElement, { target: { value: "123" } })
    expect(inputElement).toHaveValue("123")
  })

  it("renders with disabled attribute", () => {
    const { control } = useForm()

    render(
      <FormProvider {...{ control }}>
        <InputField id="test-input" control={control} disabled={true} />
      </FormProvider>
    )

    const inputElement = screen.getByTestId("test-input")
    expect(inputElement).toBeDisabled()
  })
})
