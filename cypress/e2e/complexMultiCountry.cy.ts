describe("Pricing", () => {
  // before(() => {
  //   const now = new Date(2024, 0, 1)
  //   cy.clock(now)
  // })
  beforeEach(() => {
    cy.visit("sheet")
    cy.importFile("cypress/fixtures/complexMultiCountry.json")
  })
  it("should check the last present value is as expected", () => {
    // cy.visit("sheet")

    cy.contains("th", "Present value").nextAll().as("cells")

    cy.get("@cells").should("have.length", 10)
    cy.get("@cells").first().contains("1,631,000")
    cy.get("@cells").last().contains("475,349")
  })

  it("should check the last total income is as expected", () => {
    // cy.visit("sheet")
    // cy.get('[data-testid="scrollableTable"]').scrollTo(0, 1400)
    // cy.get("table").scrollTo("bottom")
    // cy.get("Total Income").scrollIntoView()

    // nextAll().as("cells")

    cy.contains("th", "Total Income").nextAll().as("cells")

    cy.get("@cells").should("have.length", 9)
    cy.get("@cells").first().contains("25,896")
    cy.get("@cells").last().contains("7,050")
  })

  it("should check the last total expenses is as expected", () => {
    // cy.visit("sheet")

    cy.contains("th", "Total Expenses").nextAll().as("cells")

    cy.get("@cells").should("have.length", 9)
    cy.get("@cells").first().contains("80,000")
    cy.get("@cells").last().contains("87,675")
  })
})
