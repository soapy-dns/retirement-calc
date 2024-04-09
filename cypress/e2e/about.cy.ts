describe("About page", () => {
  it("should display about page", () => {
    cy.visit("/")

    cy.contains("About this calculator")
  })
})
