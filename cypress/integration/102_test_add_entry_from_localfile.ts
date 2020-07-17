/// <reference path="../support/index.d.ts" />

describe('Add entry from Local File', () => {
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
    it('Creates a new entry from a Local mp3 file', function () {
        cy.visit('podcasts');

        cy.get('#file-upload-group').click();
        cy.get('#upload-local-file').click();

        cy.get(`.dz-wrapper`).attachFile('sine_Secs-60_Freq-440_Amp_08.mp3', {
            subjectType: 'drag-n-drop',
        });

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
