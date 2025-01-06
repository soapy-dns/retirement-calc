import React from "react"
import { render } from "@testing-library/react"
import { AlertIcon, AlertHeading } from "../AlertIcon"
import { AlertType } from "../Alert"

describe("AlertIcon", () => {
  // TODO: better tests
  it("renders the correct icon for ERROR type", () => {
    const { container } = render(<AlertIcon alertType={AlertType.ERROR} />)
    expect(container.querySelector(".text-error-foreground")).toBeInTheDocument()
  })

  it("renders the correct icon for WARNING type", () => {
    const { container } = render(<AlertIcon alertType={AlertType.WARNING} />)
    expect(container.querySelector(".text-warning-foreground")).toBeInTheDocument()
  })

  it("renders the correct icon for SUCCESS type", () => {
    const { container } = render(<AlertIcon alertType={AlertType.SUCCESS} />)
    expect(container.querySelector(".text-success-foreground")).toBeInTheDocument()
  })

  it("renders the correct icon for INFO type", () => {
    const { container } = render(<AlertIcon alertType={AlertType.INFO} />)
    expect(container.querySelector(".text-info-foreground")).toBeInTheDocument()
  })

  it("renders nothing for undefined type", () => {
    const { container } = render(<AlertIcon />)
    expect(container.firstChild).toBeNull()
  })
})

describe("AlertHeading", () => {
  it("renders the correct heading for ERROR type", () => {
    const { getByText } = render(<AlertHeading alertType={AlertType.ERROR} />)
    expect(getByText("Error")).toBeInTheDocument()
  })

  it("renders the correct heading for WARNING type", () => {
    const { getByText } = render(<AlertHeading alertType={AlertType.WARNING} />)
    expect(getByText("Warning")).toBeInTheDocument()
  })

  it("renders the correct heading for SUCCESS type", () => {
    const { getByText } = render(<AlertHeading alertType={AlertType.SUCCESS} />)
    expect(getByText("Success")).toBeInTheDocument()
  })

  it("renders the correct heading for INFO type", () => {
    const { getByText } = render(<AlertHeading alertType={AlertType.INFO} />)
    expect(getByText("Info")).toBeInTheDocument()
  })

  it("renders nothing for undefined type", () => {
    const { container } = render(<AlertHeading />)
    expect(container.firstChild).toBeNull()
  })
})
