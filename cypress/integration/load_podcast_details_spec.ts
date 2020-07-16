/// <reference path="../support/index.d.ts" />

before(() => {
    // reset and seed the database prior to every test
    console.log('podcast_add_spec', 'before');
    cy.login();
});

describe('Podcast Detail Page', () => {
    it('Loads the podcast details page', function () {
        cy.visit('/podcasts').then((r) => {
            console.log('load_podcast_details_spec', 'Podcast Detail Page', r);
            cy.get('.podcast-container-wrapper').should('not.be.empty');
        });
    });
});
