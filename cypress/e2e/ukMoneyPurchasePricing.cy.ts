describe("Partial money purchase pricing", () => {
  before(() => {
    const now = new Date(2024, 0, 1)
    cy.clock(now)
  })
  beforeEach(() => {
    cy.visit("sheet")
    cy.importFile("cypress/fixtures/ukMoneyPurchase.json")

    // cy.clock(Date.UTC(2023, 1, 1), ["Date"]) // TODO: server side actions
  })
  it("should import", () => {
    // TODO:
    // TODO: how to deal with errors and years in past
    // cy.contains("th", "Present value").nextAll().as("cells")
    // cy.get("@cells").should("have.length", 2)
    // cy.get("@cells").first().contains("200,00")
    // cy.get("@cells").last().contains("180,000")
  })
})
