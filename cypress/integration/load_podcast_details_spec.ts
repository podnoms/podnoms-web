let auth;

before(() => {
    // reset and seed the database prior to every test
    console.log('podcast_add_spec', 'before');
    cy.clearLocalStorage();
    cy.request('POST', `${Cypress.env('API_SERVER')}/auth/login`, {
        username: Cypress.env('TEST_HARNESS_USER'),
        password: Cypress.env('TEST_HARNESS_PASSWORD'),
    })
        .its('body')
        .then((res) => {
            console.log('podcast_add_spec', 'got_auth', res);
            auth = res;
        });
});

beforeEach(() => {
    console.log('podcast_add_spec', 'beforeEach');
    cy.visit('/podcasts', {
        onBeforeLoad(win) {
            localStorage.setItem(Cypress.env('TOKEN_KEY_NAME'), auth.jwt.token);
            localStorage.setItem('refresh_token', auth.refresh);
        },
    });
});

describe('Podcast Detail Page', () => {
    it('Loads the podcast details page', function () {
        cy.visit('/podcasts').then((r) => {
            console.log('load_podcast_details_spec', 'Podcast Detail Page', r);
            cy.get('.podcast-container-wrapper').should('not.be.empty');
        });
    });
});
