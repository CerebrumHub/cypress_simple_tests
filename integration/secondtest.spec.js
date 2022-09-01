describe('Second suite', () => {
    it('Open home page', () => {
        cy.intercept('https://api.demoblaze.com/entries').as('entries')
        cy.visit('https://www.demoblaze.com/')
        cy.wait('@entries').then(($entriesResponse) => {
            expect($entriesResponse.response.statusCode).to.eq(200)
            expect(JSON.stringify($entriesResponse.response.body)).to.contain('HTC')
        })
    });
    it('Stub on homepage', () => {
        cy.intercept('https://api.demoblaze.com/entries', {fixture: "stubbedResponse.json"}).as('entries')
        cy.visit('https://www.demoblaze.com/')
        cy.wait('@entries')
    });
    it('Stub status code', () => {
        cy.intercept('https://api.demoblaze.com/view', {statusCode: 404}).as('theView')
        cy.visit('https://www.demoblaze.com/prod.html?idp_=7')
        cy.wait('@theView').then(($theStubbedResponse) => {
            expect($theStubbedResponse.response.statusCode).to.eq(404)
        })
    });
    it.skip('Two URLs', () => {
        cy.visit('http://google.com')
        cy.origin('https://apple.com').then(($resondUrl) => {
            cy.visit('https://apple.com')
            // do something here
            // All actions
        })
    })
})