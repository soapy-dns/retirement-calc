describe("Defined benefit pricing", () => {
  before(() => {
    const now = new Date(2024, 0, 1)
    cy.clock(now)
  })
  beforeEach(() => {
    cy.visit("sheet")
    cy.importFile("cypress/fixtures/definedBenefitExample.json")
  })
  it("should have correct values for defined benefits / state pension example", () => {
    cy.contains("th", "Present value").nextAll().as("cells")

    cy.get("@cells").should("have.length", 16)
    cy.get("@cells").first().contains("10,000")
    cy.get("@cells").last().contains("43,519")
  })

  it("should check the last total income is as expected", () => {
    // cy.visit("sheet")
    // cy.get('[data-testid="scrollableTable"]').scrollTo(0, 1400)
    // cy.get("table").scrollTo("bottom")
    // cy.get("Total Income").scrollIntoView()

    // nextAll().as("cells")

    cy.contains("th", "Total Income").nextAll().as("cells")

    cy.get("@cells").should("have.length", 15)
    cy.get("@cells").first().contains("110,050")
    cy.get("@cells").last().contains("1,104,454")
  })

  it("should check the last total expenses is as expected", () => {
    // cy.visit("sheet")

    cy.contains("th", "Total Expenses").nextAll().as("cells")

    cy.get("@cells").should("have.length", 15)
    cy.get("@cells").first().contains("100,347")
    cy.get("@cells").last().contains("1,096,096")
  })
})
