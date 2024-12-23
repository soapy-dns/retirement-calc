describe("Rental property sold after a couple of years", () => {
  before(() => {
    const now = new Date(2024, 0, 1)
    cy.clock(now)
  })
  beforeEach(() => {
    cy.visit("sheet")
    cy.importFile("cypress/fixtures/propertyWithRentalSold.json")
  })
  it("should have correct values for present value", () => {
    cy.contains("th", "Present value").nextAll().as("cells")

    cy.get("@cells").should("have.length", 11)
    cy.get("@cells").first().contains("1,500,000")
    cy.get("@cells").last().contains("-14,066")
  })

  it("should check the last total income is as expected", () => {
    cy.contains("th", "Total Income").nextAll().as("cells")

    cy.get("@cells").should("have.length", 10)
    cy.get("@cells").first().contains("19,984")
    cy.get("@cells").last().contains("702")
  })

  it("should check the last total expenses is as expected", () => {
    cy.contains("th", "Total Expenses").nextAll().as("cells")

    cy.get("@cells").should("have.length", 10)
    cy.get("@cells").first().contains("50,000")
    cy.get("@cells").last().contains("99,637")
  })
})
