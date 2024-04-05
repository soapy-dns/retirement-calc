describe("Partial transfer pricing", () => {
  beforeEach(() => {
    cy.visit("sheet")
    cy.importFile("cypress/fixtures/transferExample.json")
  })
  it("should have correct values for transfer example", () => {
    cy.contains("th", "Present value").nextAll().as("cells")

    cy.get("@cells").should("have.length", 2)
    cy.get("@cells").first().contains("200,00")
    cy.get("@cells").last().contains("180,000")
  })
})
