import React from "react"
import { render, screen } from "@testing-library/react"
import { Alert, AlertType } from "../Alert"

describe("Alert Component", () => {
  it("should render with default props", () => {
    render(<Alert />)
    const alertElement = screen.getByRole("alert")
    expect(alertElement).toBeInTheDocument()
    expect(alertElement).toHaveClass("p-2 border border-primary-foreground")
  })

  it("should render with a heading", () => {
    render(<Alert heading="Test Heading" />)
    const headingElement = screen.getByText("Test Heading")
    expect(headingElement).toBeInTheDocument()
    expect(headingElement).toHaveClass("font-semibold")
  })

  it("should render with children", () => {
    render(<Alert>Test Children</Alert>)
    const childrenElement = screen.getByText("Test Children")
    expect(childrenElement).toBeInTheDocument()
  })

  it("should render with success alert type", () => {
    render(<Alert alertType={AlertType.SUCCESS} />)
    const alertElement = screen.getByRole("status")
    expect(alertElement).toHaveClass("bg-success")
  })

  it("should render with error alert type", () => {
    render(<Alert alertType={AlertType.ERROR} />)
    const alertElement = screen.getByRole("alert")
    expect(alertElement).toHaveClass("bg-error")
  })

  it("should render with warning alert type", () => {
    render(<Alert alertType={AlertType.WARNING} />)
    const alertElement = screen.getByRole("alert")
    expect(alertElement).toHaveClass("bg-warning")
  })

  it("should render with info alert type", () => {
    render(<Alert alertType={AlertType.INFO} />)
    const alertElement = screen.getByRole("status")
    expect(alertElement).toHaveClass("bg-info")
  })
})
