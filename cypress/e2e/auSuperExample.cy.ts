describe("Au Super example", () => {
  beforeEach(() => {
    cy.visit("sheet")
    cy.importFile("cypress/fixtures/auSuperExample.json")
  })
  it("should have correct values for present value", () => {
    cy.contains("th", "Present value").nextAll().as("cells")

    cy.get("@cells").should("have.length", 37)
    cy.get("@cells").first().contains("1,050,000")
    cy.get("@cells").last().contains("-11,571")
  })

  it("should check the last total income is as expected", () => {
    cy.contains("th", "Total Income").nextAll().as("cells")

    cy.get("@cells").should("have.length", 36)
    cy.get("@cells").first().contains("500")
    cy.get("@cells").last().contains("100")
  })

  it("should check the last total expenses is as expected", () => {
    cy.contains("th", "Total Expenses").nextAll().as("cells")

    cy.get("@cells").should("have.length", 36)
    cy.get("@cells").first().contains("50,000")
    cy.get("@cells").last().contains("70,830")
  })
})
