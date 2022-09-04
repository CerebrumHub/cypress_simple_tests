// Test suite name
describe('First suite', ()=> {
    beforeEach(()=>{
        Cypress.Cookies.preserveOnce('firstCookie', 'firstValue')
    })
    /*
    Test name
    Starts with fresh brand new browser
     */
    it('first test', ()=>{
        // cy.visit('https://example.com')
        //cy.visit('program')
        cy.setCookie('firstCookie', 'firstValue')
        cy.allure().step("Open registration page", false)
        cy.visit('cypress/fixtures/registration_form_ajax.html' , {timeout:12000})
        cy.get('#name').clear().type("Hey yoo {enter}")
        cy.allure().attachment("This is test attachment", "Attachment string can be here", "text/plain")
        cy.screenshot('full_name')
        cy.allure().fileAttachment("Screenshot", "/cypress/screenshots/firsttest.spec.js/full_name.png", "image/png")
        cy.get('.email').type('hey@hello.com')
        // cy.get('#country').select('object:4')
        // cy.get('#country').select(1)
        cy.get('#country').select('Spain').find(':selected').should('have.text', 'Spain')
        // cy.get('#city').select(['Malaga', 'Valencia']).then(({$selectedOne}) => {
        //     expect($selectedOne).to.have.length(2)
        // expect($selectedOne[0]).to.have.text('Malaga')
        // })

        cy.get('#city').select(['Malaga', 'Valencia']).screenshot()

        cy.get('[type="date"]').type('2022-02-01')
        // cy.get('[type="radio"]').first()
        // cy.get('[type="radio"]').eq(3).check()
        // cy.get('[type="radio"]').check('Monthly')
        // cy.get('[type="radio"]').eq(3).check().uncheck()
        // cy.get('[type="radio"]').eq(-1)
        cy.get('[type="radio"]').eq(2).check().should('be.checked').and('have.attr', 'value', 'Monthly')
        // cy.get('[type="submit"]').click()
        cy.get('[type="checkbox"]').should('have.length', '2')
        // cy.get('[type="submit"]').parent().find('span')
        cy.get('[type="submit"]').siblings()
        cy.contains('Accept our cookie policy').should('have.attr', 'href', 'cookiePolicy.html')
        cy.get('#name').parent().find('label').should('have.text', 'Name')
        cy.get('#country').find(':selected').should('have.text', 'Spain')
        // cy.viewport(400,600)
        // cy.contains('Accept our cookie policy').parents()

        cy.getCookie('firstCookie').then(($theCookie) => {
            expect($theCookie.value).to.eq('firstValue')
            expect($theCookie.domain).to.contain('local')
        })
    })

    it('Second test', ()=> {
        // Both should be with beforeEach
        cy.setCookie('firstCookie', 'firstValue')
        cy.getCookies().should('have.length',1)
        cy.getCookie('firstCookie').then(($theCookie) => {
            expect($theCookie.value).to.eq('firstValue')
            expect($theCookie.domain).to.contain('local')
        })
        Cypress.env('secondCookieValue', 'secondValue')

        cy.log(Cypress.env('secondCookieValue'))
        cy.setCookie('secondCookie', Cypress.env('secondCookieValue'))
        cy.clearCookie('firstCookie')
        cy.getCookies().then(($theNewCookie) => {
            expect($theNewCookie).to.have.length(1)
            expect($theNewCookie[0].name).to.eq('secondCookie')
        })
        cy.clearCookies()
        cy.getCookies().should('have.length', 0)
    });
})