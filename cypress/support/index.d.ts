// describe custom Cypress commands in this file

// load the global Cypress types
/// <reference types="cypress" />
// load the 3rd party command definition for cy.waitUntil()
/// <reference types="cypress-wait-until" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to import file from fixtures
     */
    importFile(fileName: string): Chainable<Element>
  }
}
