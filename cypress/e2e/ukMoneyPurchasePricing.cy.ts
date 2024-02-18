describe.only("Partial money purchase pricing", () => {
  beforeEach(() => {
    cy.visit("sheet")
    // cy.clock(Date.UTC(2023, 1, 1), ["Date"]) // TODO: server side actions
  })
  it("should import", () => {
    cy.visit("file/import")
    cy.contains("Import a scenario file")
    cy.get("input[type=file]").as("InputFile")

    cy.get("@InputFile").click()

    cy.get("@InputFile").selectFile("cypress/fixtures/ukMoneyPurchase.json")

    cy.contains("Upload").click()

    // TODO: how to deal with errors and years in past

    // cy.contains("th", "Present value").nextAll().as("cells")

    // cy.get("@cells").should("have.length", 2)
    // cy.get("@cells").first().contains("200,00")
    // cy.get("@cells").last().contains("180,000")
  })
})
