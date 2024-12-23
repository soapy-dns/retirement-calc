describe("Salary example for UK including National Insurance", () => {
  before(() => {
    const now = new Date(2024, 0, 1)
    cy.clock(now)
  })
  beforeEach(() => {
    cy.visit("sheet")
    cy.importFile("cypress/fixtures/salaryExampleUK.json")
  })
  it("should have correct values for present value", () => {
    cy.contains("th", "Present value").nextAll().as("cells")

    cy.get("@cells").should("have.length", 8)
    cy.get("@cells").first().contains("10,000")
    cy.get("@cells").last().contains("-40,902")
  })

  it("should check the last total income is as expected", () => {
    cy.contains("th", "Total Income").nextAll().as("cells")

    cy.get("@cells").should("have.length", 7)
    cy.get("@cells").first().contains("100,050")
    cy.get("@cells").last().contains("54")
  })

  it("should check the last total expenses is as expected", () => {
    cy.contains("th", "Total Expenses").nextAll().as("cells")

    cy.get("@cells").should("have.length", 7)
    cy.get("@cells").first().contains("68,988")
    cy.get("@cells").last().contains("67,196")
  })
})
