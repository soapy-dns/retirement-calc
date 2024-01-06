describe.only("Pricing", () => {
  it("should check the last present value is as expected", () => {
    cy.visit("sheet")

    cy.contains("td", "Present value").nextAll().as("cells")

    cy.get("@cells").should("have.length", 24)
    cy.get("@cells").first().contains("1,631,000")
    cy.get("@cells").last().contains("471,526")
  })

  it("should check the last total income is as expected", () => {
    cy.visit("sheet")

    cy.contains("td", "Total Income").nextAll().as("cells")

    cy.get("@cells").should("have.length", 23)
    cy.get("@cells").first().contains("12,918")
    cy.get("@cells").last().contains("18,689")
  })

  it("should check the last total expenses is as expected", () => {
    cy.visit("sheet")

    cy.contains("td", "Total Expenses").nextAll().as("cells")

    cy.get("@cells").should("have.length", 23)
    cy.get("@cells").first().contains("80,000")
    cy.get("@cells").last().contains("95,805")
  })
})
