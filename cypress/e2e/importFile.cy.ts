describe("Partial transfer pricing", () => {
  beforeEach(() => {
    cy.visit("sheet")
  })
  it("should display import page", () => {
    // the rest is dealt with in the importFile command
    cy.visit("file/import")
    cy.contains("Import a scenario file")
  })
})
