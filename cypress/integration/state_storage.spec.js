/// <reference types="cypress" />

context("State/Session Storage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4000/");
    const state /*: AppState */ = {
      count: 10,
    };
    // Set in /server/config.js
    sessionStorage.setItem("state", JSON.stringify(state));
    // localStorage.setItem("state", JSON.stringify(state));
  });
  afterEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  // Although local storage is automatically cleared
  // in between tests to maintain a clean state
  // sometimes we need to clear the local storage manually

  it("Count is rememebered between reloads", () => {
    cy.get("h2[data-cy=number-display]").should("contain", "10");
    cy.get("button[data-cy=plus]").click();
    cy.get("button[data-cy=plus]").click();
    cy.get("button[data-cy=plus]").click();
    cy.get("h2[data-cy=number-display]").should("contain", "13");
    cy.reload();
    cy.get("h2[data-cy=number-display]").should("contain", "13");
  });
});
