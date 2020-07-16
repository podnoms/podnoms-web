Cypress.Commands.add('login', () => {
    cy.clearLocalStorage();
    return cy
        .request('POST', `${Cypress.env('API_SERVER')}/auth/login`, {
            username: Cypress.env('TEST_HARNESS_USER'),
            password: Cypress.env('TEST_HARNESS_PASSWORD'),
        })
        .then((res) => {
            localStorage.setItem(Cypress.env('TOKEN_KEY_NAME'), auth.jwt.token);
            localStorage.setItem('refresh_token', auth.refresh);
        });
});

Cypress.Commands.add('deletePodcasts', () => {
    return cy
        .request({
            method: 'DELETE',
            url: `${Cypress.env('API_SERVER')}/podcast`,
            auth: {
                bearer: auth.jwt.token,
            },
        })
        .its('body')
        .then((d) => {
            console.log('podcast_add_spec', 'clear_podcasts', d);
        });
});
Cypress.Commands.add('createPodcast', () => {
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
    return cy.get('#podcast-editform-submit-button').click();
});
