it('loads examples', () => {
    const baseUrl: string = 'https://dev.pdnm.be:4200';
    cy.visit(baseUrl);
    cy.contains('Robot powered podcasts');
});
