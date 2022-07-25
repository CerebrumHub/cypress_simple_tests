describe('First suite', ()=> {
    it('Upload test file', () => {
        cy.visit('cypress/fixtures/formWithFile.html')
        cy.get('[type="file"]').selectFile('cypress/fixtures/example.json')
        cy.get('form').submit()
        cy.get('h1').should('have.text', 'Submission received')
        cy.log(Cypress.env('firstCookieValue'))
    });
})