import React from "react"
import { render, screen, fireEvent, act } from "@testing-library/react"
import "@testing-library/jest-dom"
import { GenericModal, IGenericModalProps } from "../GenericModal"

describe("GenericModal", () => {
  const defaultProps: IGenericModalProps = {
    heading: "Test Modal",
    showModal: true,
    handleCancel: jest.fn(),
    children: <div>Modal Content</div>
  }

  it("should render the modal with heading and children", () => {
    render(<GenericModal {...defaultProps} />)
    expect(screen.getByText("Test Modal")).toBeInTheDocument()
    expect(screen.getByText("Modal Content")).toBeInTheDocument()
  })

  it("should call handleCancel when the close button is clicked", () => {
    render(<GenericModal {...defaultProps} />)
    fireEvent.click(screen.getByLabelText("Close modal"))
    expect(defaultProps.handleCancel).toHaveBeenCalled()
  })

  it("should have hidden class when showModal is false", async () => {
    await act(() => render(<GenericModal {...defaultProps} showModal={false} />))

    expect(screen.getByRole("dialog", { hidden: true })).toHaveClass("hidden")
  })

  it("should not have hidden class when showModal is true", () => {
    render(<GenericModal {...defaultProps} showModal={true} />)
    expect(screen.getByRole("dialog")).not.toHaveClass("hidden")
  })
})
