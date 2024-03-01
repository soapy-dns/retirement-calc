describe("Pricing", () => {
  it("should check the last present value is as expected", () => {
    cy.visit("sheet")

    cy.contains("th", "Present value").nextAll().as("cells")

    cy.get("@cells").should("have.length", 22)
    cy.get("@cells").first().contains("1,631,000")
    cy.get("@cells").last().contains("460,798")
  })

  it("should check the last total income is as expected", () => {
    cy.visit("sheet")
    // cy.get('[data-testid="scrollableTable"]').scrollTo(0, 1400)
    // cy.get("table").scrollTo("bottom")
    // cy.get("Total Income").scrollIntoView()

    // nextAll().as("cells")

    cy.contains("th", "Total Income").nextAll().as("cells")

    cy.get("@cells").should("have.length", 21)
    cy.get("@cells").first().contains("25,896")
    cy.get("@cells").last().contains("7,278")
  })

  it("should check the last total expenses is as expected", () => {
    cy.visit("sheet")

    cy.contains("th", "Total Expenses").nextAll().as("cells")

    cy.get("@cells").should("have.length", 21)
    cy.get("@cells").first().contains("80,000")
    cy.get("@cells").last().contains("90,306")
  })
})
