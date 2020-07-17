// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        login(): Chainable<Element>;
        resetJobScheduler(): Chainable<Element>;
        deletePodcasts(): Chainable<Element>;
        createPodcast(): Chainable<Element>;
    }
}
