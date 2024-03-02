describe("Partial transfer pricing", () => {
  beforeEach(() => {
    cy.visit("sheet")
  })
  it("should import", () => {
    cy.visit("file/import")
    cy.contains("Import a scenario file")
    cy.get("input[type=file]").as("InputFile")

    cy.get("@InputFile").click()

    cy.get("@InputFile").selectFile("cypress/fixtures/transferExample.json")

    cy.contains("Upload").click()

    cy.contains("th", "Present value").nextAll().as("cells")

    cy.get("@cells").should("have.length", 2)
    cy.get("@cells").first().contains("200,00")
    cy.get("@cells").last().contains("180,000")
  })
})
