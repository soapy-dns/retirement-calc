describe.only("Importing", () => {
  beforeEach(() => {
    cy.visit("sheet")
  })
  it("should import", () => {
    cy.visit("file/import")
    cy.contains("Import a scenario file")
    cy.get("input[type=file]").as("InputFile")

    cy.get("@InputFile").click()

    cy.get("@InputFile").selectFile("cypress/fixtures/transferExample.json")

    cy.contains("Upload")

    cy.contains("Upload").click()
  })
})
