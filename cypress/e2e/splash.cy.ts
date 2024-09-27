describe("Splash page", () => {
  it("should display splash page", () => {
    cy.visit("/")

    cy.contains("Worried how you'll manage in retirement?")
  })
})
