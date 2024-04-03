describe("Rate variance pricing", () => {
  beforeEach(() => {
    cy.visit("sheet")
  })
  it("should import", () => {
    cy.visit("file/import")
    cy.contains("Import a scenario file")
    cy.get("input[type=file]").as("InputFile")

    cy.get("@InputFile").click()

    cy.get("@InputFile").selectFile("cypress/fixtures/rateVariance.json")

    cy.contains("Upload").click()

    cy.contains("th", "Present value").nextAll().as("cells")

    cy.get("@cells").should("have.length", 51)
    cy.get("@cells").first().contains("2,330,000")
    cy.get("@cells").last().contains("7,426,453")
  })
})
