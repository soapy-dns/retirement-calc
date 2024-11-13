import React from "react"
import { render, screen, fireEvent, act } from "@testing-library/react"
import { AlertBanner } from "../AlertBanner"
import { AlertType } from "../Alert"

describe("AlertBanner", () => {
  const mockOnClose = jest.fn()

  it("renders the alert banner with the correct message", async () => {
    render(
      <AlertBanner
        variant={AlertType.SUCCESS}
        message="This is a success message"
        onClose={mockOnClose}
        dismissible={true}
      />
    )

    expect(screen.getByText("This is a success message")).toBeInTheDocument()
  })

  it("renders the alert banner with the correct variant", () => {
    render(
      <AlertBanner
        variant={AlertType.ERROR}
        message="This is an error message"
        onClose={mockOnClose}
        dismissible={true}
      />
    )

    expect(screen.getByText("This is an error message")).toBeInTheDocument()
  })

  it("calls onClose when the close button is clicked", () => {
    render(
      <AlertBanner
        variant={AlertType.WARNING}
        message="This is a warning message"
        onClose={mockOnClose}
        dismissible={true}
      />
    )

    fireEvent.click(screen.getByRole("button"))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it("does not render the close button when dismissible is false", () => {
    render(
      <AlertBanner
        variant={AlertType.INFO}
        message="This is an info message"
        onClose={mockOnClose}
        dismissible={false}
      />
    )

    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })

  it('applies the correct maxSize class when maxSize is "half"', () => {
    render(
      <AlertBanner
        variant={AlertType.SUCCESS}
        message="This is a success message"
        onClose={mockOnClose}
        dismissible={true}
        maxSize="half"
      />
    )
    expect(screen.getByRole("alert")).toHaveClass("max-w-lg")
  })

  it('applies the correct maxSize class when maxSize is "full"', () => {
    render(
      <AlertBanner
        variant={AlertType.SUCCESS}
        message="This is a success message"
        onClose={mockOnClose}
        dismissible={true}
        maxSize="full"
      />
    )
    expect(screen.getByRole("alert")).not.toHaveClass("max-w-lg")
  })
})
