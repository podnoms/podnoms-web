/// <reference path="../support/index.d.ts" />

describe('Add Podcast', () => {
    before(() => {
        // reset and seed the database prior to every test
        console.log('podcast_add_spec', 'before');
        cy.login();
        // cy.resetJobScheduler();
    });

    beforeEach(() => {
        console.log('podcast_add_spec', 'beforeEach');
        cy.deletePodcasts();
    });
    it('Creates a new podcast', function () {
        cy.visit('podcasts');

        cy.get('#sidebar-add-podcast-button').click();
        cy.get('#title').click();
        cy.get('#title').type('Test Podcast Harness');
        cy.get('#category-selector').click();
        cy.get(
            '#category-selector-wrapper > ng-dropdown-panel > div > div:nth-child(2) > div:nth-child(2)'
        ).click();
        cy.get('.ql-editor').click();
        cy.get('.ql-editor').type('This is the description of my podcast');
        cy.get('#image-upload-random-button').click();
        cy.wait(5000);
        cy.get('#podcast-editform-submit-button').click();
    });
});
