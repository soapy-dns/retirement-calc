describe("Au Super example", () => {
  // before(() => {
  //   const now = new Date(2024, 0, 1)
  //   cy.clock(now)
  // })
  beforeEach(() => {
    cy.visit("sheet")
    cy.importFile("cypress/fixtures/auSuperExample.json")
  })

  it("should have correct values for present value", () => {
    cy.contains("th", "Present value").nextAll().as("cells")

    cy.get("@cells").should("have.length", 13)
    cy.get("@cells").first().contains("1,050,000")
    cy.get("@cells").last().contains("-12,524")
  })

  it("should check the last total income is as expected", () => {
    cy.contains("th", "Total Income").nextAll().as("cells")

    cy.get("@cells").should("have.length", 12)
    cy.get("@cells").first().contains("500")
    cy.get("@cells").last().contains("100")
  })

  it("should check the last total expenses is as expected", () => {
    cy.contains("th", "Total Expenses").nextAll().as("cells")

    cy.get("@cells").should("have.length", 12)
    cy.get("@cells").first().contains("50,000")
    cy.get("@cells").last().contains("70,129")
  })
})
