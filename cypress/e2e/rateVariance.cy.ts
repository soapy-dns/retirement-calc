describe("Rate variance pricing", () => {
  before(() => {
    const now = new Date(2024, 0, 1)
    cy.clock(now)
  })
  beforeEach(() => {
    cy.visit("sheet")
    cy.importFile("cypress/fixtures/rateVariance.json")
  })
  it("should have correct values for rate variance on assets example", () => {
    cy.contains("th", "Present value").nextAll().as("cells")

    cy.get("@cells").should("have.length", 51)
    cy.get("@cells").first().contains("2,330,000")
    cy.get("@cells").last().contains("7,505,211")
  })
})
