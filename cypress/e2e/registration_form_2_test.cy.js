beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

// Structure and visual tests before any actions
describe('Section 1: Main elements on page are correct', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.get('img').should('have.attr', 'src').should('include','cerebrum_hub_logo')
        // get element and check its parameter height, to be equal 178
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)
        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        // Check that currently opened URL is value:
        cy.url().should('contain','/registration_form_1.html')
        // Visit previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
        cy.get('nav').children().eq(1).should('have.attr', 'href', 'https://cerebrumhub.com/')
    })

    it('Check that URL to CH is correct and clickable', () => {
        cy.get('nav').children().then(options => {
            const actual = [...options].map(option => option.innerText)
            expect(actual).to.deep.eq(['Registration form 1', 'Cerebrum Hub homepage'])
        })
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'https://cerebrumhub.com/')
    })

    it('Check CSS text has correct values', () => {
        cy.get('#username').type(' ')
        cy.get('#username').should('have.css', 'box-shadow', '0 0 5px 1px red')
        // input error show red boarder
        // headers has blue text
    })

    it('Application show error when input is invalid', () => {
        // empty fields - assert has boarder
        // empty fields - show correct tooltip
        // check list of html elements that should be mandatory and has required attribute
    })

    it('Check what list of options is present for Radio buttons', ()=>{
        // List of elements in radio button section is correct
        // Selecting one will remove selection from other radio button
    })

    it('Check what list of cars can be selected', ()=>{
        // Check list of checkbox elements
    })
})

describe('Section 2: Input fields support only correct patterns', ()=>{
    it('Check that email has pattern check', ()=>{
        // Input invalid email
        // Assert that email show error tooltip
        // Assert that error message is visible
        // Input valid email
        // No tooltip is present, error is not visible
        // Email should have limitations 1 - up to max length
    })

    it('Check date input', ()=>{
        // By default, date should be empty
        // Assert format that this input can get mm/ dd/ yyyy
        // Assert that birthday can be only with past dates, or today
    })

    it('Check what fields are mandatory', ()=>{
        // Assert that mandatory list on input fields is correct
    })

    it('Check that submit button can be selected only with mandatory values', ()=>{
        // Submit button by default is disabled and cannot be clicked
        // If one of mandatory fields show error - submit button is disable
        // If passwords are different - submit button is disabled
        // When all fields are correct - submit button is show and clickable
        // Clicking submit button will show success message
    })
})

describe('Section 5: Submitting form', ()=>{
    it('Check that on URL click request send is correct? - advanced', ()=>{
        // Something here
    })
})

