describe('The Login Page', () => {
    beforeEach(() => {
        // reset and seed the database prior to every test
        cy.clearLocalStorage();
        // bit cheesy having to login in the login page test form but we must if we want to nuke data
        // we'll clear local storage afterwards so everything is as it should be
        cy.login();
        cy.deletePodcasts();
        cy.clearLocalStorage();
    });

    it('Sets auth cookie and gets jwt token', function () {
        // destructuring assignment of the this.currentUser object

        cy.visit('auth/login');

        cy.get('input[name=login-username]').type(
            Cypress.env('TEST_HARNESS_USER')
        );

        // {enter} causes the form to submit
        cy.get('input[name=login-password]').type(
            `${Cypress.env('TEST_HARNESS_PASSWORD')}{enter}`
        );

        // we should be redirected to /dashboard
        cy.url().should('include', '/podcasts');

        // our auth cookie should be present
        cy.getCookie('SESSIONID').should('exist');

        // our jwt should be in localStorage
        cy.window()
            .its('localStorage')
            .invoke('getItem', 'auth_token')
            .should('exist');

        cy.get('.profile-dropdown-button').should(
            'contain',
            Cypress.env('TEST_HARNESS_DISPLAY_NAME')
        );
    });
});
