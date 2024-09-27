describe("About page", () => {
  it("should display about page", () => {
    cy.visit("/docs/about")

    cy.contains("About this calculator")
  })
})
