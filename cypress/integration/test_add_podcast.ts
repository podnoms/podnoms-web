/// <reference path="../support/index.d.ts" />

describe('Add Podcast', () => {
    before(() => {
        // reset and seed the database prior to every test
        console.log('podcast_add_spec', 'before');
        cy.login();
    });

    beforeEach(() => {
        console.log('podcast_add_spec', 'beforeEach');
        cy.deletePodcasts();
    });
    it('creates a new podcast', function () {
        cy.createPodcast();
    });
});
