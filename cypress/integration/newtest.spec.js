describe('First suite', () => {
    it('first test', () => {
        cy.visit('http://localhost:3000/')
        cy.get('[name="Installation services"]').children().eq(0).click()
        cy.get('[name="Work list"]').click()
        cy.get('.navbar-sub-half').should('have.text', 'Work list')
    })

    it.skip('Stub on homepage', () => {
        cy.intercept('https://api.demoblaze.com/entries', {fixture: "stubbedResponse.json"}).as('entries')
        cy.visit('https://www.demoblaze.com/')
        cy.wait('@entries')
    });

    it.skip('Stub status code', () => {
        cy.intercept('https://api.demoblaze.com/view', {statusCode: 404}).as('theView')
        cy.visit('https://www.demoblaze.com/prod.html?idp_=7')
        cy.wait('@theView').then(($theStubbedResponse) => {
            expect($theStubbedResponse.response.statusCode).to.eq(404)
        })
    });
})