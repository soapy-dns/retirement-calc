describe("Partial transfer pricing", () => {
  // before(() => {
  //   const now = new Date(2024, 0, 1)
  //   cy.clock(now)
  // })
  beforeEach(() => {
    cy.visit("sheet")
  })
  it("should display import page", () => {
    // the rest is dealt with in the importFile command
    cy.visit("file/import")
    cy.contains("Import a scenario file")
  })
})
