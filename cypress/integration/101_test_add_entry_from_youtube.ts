/// <reference path="../support/index.d.ts" />

describe('Add entry from YouTube', () => {
    before(() => {
        // reset and seed the database prior to every test
        console.log('podcast_add_spec', 'before');
        cy.login();
        cy.resetJobScheduler();
    });

    beforeEach(() => {
        console.log('podcast_add_spec', 'beforeEach');
        cy.deletePodcasts();
        cy.createPodcast();
    });
    it('Creates a new entry from a YouTube url', function () {
        cy.visit('podcasts');
        cy.get('#add-podcast-from-url').click();
        cy.get('#upload-url-entry-url').type(
            'https://www.youtube.com/watch?v=M2dhD9zR6hk'
        );
        cy.get('.btn-secondary').click();

        cy.get('.entry-list-wrapper.processing', { timeout: 60000 }).should(
            'be.visible'
        );
        cy.get('.entry-list-wrapper.caching', { timeout: 60000 }).should(
            'be.visible'
        );
        cy.get('.entry-list-wrapper.processed', { timeout: 60000 }).should(
            'be.visible'
        );
    });
});
