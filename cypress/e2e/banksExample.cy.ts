describe("Salary example for UK including National Insurance", () => {
  before(() => {
    const now = new Date(2024, 0, 1)
    cy.clock(now)
  })
  beforeEach(() => {
    cy.visit("sheet")
    cy.importFile("cypress/fixtures/bankExample.json")
  })
  it("should have correct values for present value", () => {
    cy.contains("th", "Present value").nextAll().as("cells")

    cy.get("@cells").should("have.length", 12)
    cy.get("@cells").first().contains("20,000")
    cy.get("@cells").last().contains("371,416")
  })

  it("should check the last total income is as expected", () => {
    cy.contains("th", "Total Income").nextAll().as("cells")

    cy.get("@cells").should("have.length", 11)
    cy.get("@cells").first().contains("2,000")
    cy.get("@cells").last().contains("34,036")
  })

  it("should check the last total expenses is as expected", () => {
    cy.contains("th", "Total Expenses").nextAll().as("cells")

    cy.get("@cells").should("have.length", 11)
    cy.get("@cells").first().contains("-")
    cy.get("@cells").last().contains("2,985")
  })
})
