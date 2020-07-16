describe('The Home Page', () => {
    beforeEach(() => {
        // reset and seed the database prior to every test
        cy.clearLocalStorage();
    });
    it('loads the home page', () => {
        const baseUrl: string = 'https://dev.pdnm.be:4200';
        cy.visit(baseUrl);
        cy.contains('Robot powered podcasts');
    });
});
