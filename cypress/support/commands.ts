import 'cypress-file-upload';

Cypress.Commands.add('login', () => {
    cy.clearLocalStorage();
    return cy
        .request('POST', `${Cypress.env('API_SERVER')}/auth/login`, {
            username: Cypress.env('TEST_HARNESS_USER'),
            password: Cypress.env('TEST_HARNESS_PASSWORD'),
        })
        .then((res) => {
            localStorage.setItem('auth_token', res.body.jwt.token);
            localStorage.setItem('refresh_token', res.body.refresh);
        });
});

Cypress.Commands.add('resetJobScheduler', () => {
    return cy
        .request({
            method: 'GET',
            url: `${Cypress.env('API_SERVER')}/utility/clearhangfire`,
            auth: {
                bearer: localStorage.getItem('auth_token'),
            },
        })
        .then((d) => {
            console.log('commands', 'clearhangfire', d);
        });
});
Cypress.Commands.add('deletePodcasts', () => {
    return cy
        .request({
            method: 'DELETE',
            url: `${Cypress.env('API_SERVER')}/podcast`,
            auth: {
                bearer: localStorage.getItem('auth_token'),
            },
        })
        .then((d) => {
            console.log('podcast_add_spec', 'clear_podcasts', d);
        });
});
Cypress.Commands.add('createPodcast', () => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('API_SERVER')}/podcast`,
        auth: {
            bearer: localStorage.getItem('auth_token'),
        },
        body: {
            id: null,
            title: 'REST Podcast One',
            category: {
                id: '29c0716a-94bc-4b79-bb7a-1acb2d872101',
                description: 'Comedy',
                children: [],
            },
            description: '<p>Created via direct API call</p>',
        },
    });
});
