describe('The Login Page', () => {
    beforeEach(() => {
        // reset and seed the database prior to every test
        cy.clearLocalStorage();
    });

    it('sets auth cookie when logging in via form submission', function () {
        // destructuring assignment of the this.currentUser object
        const username = 'fergal.moran+testharness@gmail.com';
        const password = 'secret';

        cy.visit('auth/login');

        cy.get('input[name=login-username]').type(username);

        // {enter} causes the form to submit
        cy.get('input[name=login-password]').type(`${password}{enter}`);

        // we should be redirected to /dashboard
        cy.url().should('include', '/podcasts');

        // our auth cookie should be present
        cy.getCookie('SESSIONID')
            .should('exist')
            .should(() => {
                expect(localStorage.getItem('auth_token')).to.exist();
            });

        cy.get('.profile-dropdown-button').should(
            'contain',
            Cypress.env('TEST_HARNESS_DISPLAY_NAME')
        );
    });
});
