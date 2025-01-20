describe("Transfer with PercentageCosts", () => {
  // before(() => {
  //   const now = new Date(2024, 0, 1)
  //   cy.clock(now)
  // })
  beforeEach(() => {
    cy.visit("sheet")
    cy.importFile("cypress/fixtures/transferWithPercentageCosts.json")
  })
  it("should have correct values for transfer example", () => {
    cy.contains("th", "Present value").nextAll().as("cells")

    cy.get("@cells").should("have.length", 2)
    cy.get("@cells").first().contains("200,000")
    cy.get("@cells").last().contains("199,750")
  })
})
