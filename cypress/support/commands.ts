/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

// NOTE: commands must be added to index.d.ts
Cypress.Commands.add("goToSheet", () => {
  cy.visit("sheet")
  cy.intercept("POST", "/sheet").as("calculationResponse")
  cy.wait("@calculationResponse").its("response.statusCode").should("eq", 200)
})

Cypress.Commands.add("importFile", (fileName: string) => {
  // cy.visit("file/import")
  cy.intercept("POST", "/sheet").as("calculationResponse")

  cy.get('[data-testid="more-menu-button"]').click()

  cy.get('[data-testid="import-config-button"]').click()

  cy.get("input[type=file]").click({ force: false })

  cy.get("input[type=file]").as("InputFile")

  cy.get("@InputFile").click({ force: false })

  cy.get("@InputFile").selectFile(fileName, { force: false })

  // cy.contains("Upload").click({ force: true })
  cy.contains("Upload").click()

  // cy.contains("Upload").should("not.exist")
  cy.contains("Loading...").should("not.exist")
  // cy.wait(8000)

  // cy.visit("file/import")
  // cy.contains("Import a scenario file")

  // cy.get('input[type="file"]').should("exist").selectFile(fileName, { force: true })

  // cy.contains("Upload").should("not.be.disabled").click()

  // cy.contains("Loading...").should("not.exist")
})

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
