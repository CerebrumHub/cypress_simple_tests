beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

// Workshop #6 create following tests:

describe('Section 1: Functional tests', () => {
    it('User can submit form with valid data and only mandatory fields added', ()=>{
        // Add test steps for filling in only mandatory fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system show successful message
    })

    it('User can submit form with all fields added', ()=>{
        // Add test steps for filling in all fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system show successful message
    })

    it('User can use only same both first and validation passwords', ()=>{
        // Add test steps for filling in only mandatory fields
        // Type confirmation password which is different from first password
        // Assert that submit button is not enabled
        // Assert that successful message is not visible
        // Assert that error message is visible
    })

    it('Check that submit button cannot be selected if username is empty', () => {
        // Submit button by default is disabled and cannot be clicked
        cy.get('button[class="submit_button"]').should('be.disabled')

        // use function in order to fill the form with correct data
        inputValidData()

        // Add steps for emptying username input field

        // Assert that submit button is still disabled
        cy.get('button[class="submit_button"]').should('be.disabled')
    })

    //Add more similar tests for checking other mandatory field's absence

})

// Workshop #7 create more visual tests

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to be equal 178
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    // Create similar test for checking second picture

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        // Check that currently opened URL is value:
        cy.url().should('contain', '/registration_form_1.html')
        // Visit previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that URL to Cerebrum Hub page is correct and clickable', () => {
        //Create similar test for checking second link to Cerebrum Hub homepage
    })

    it('Check that radio button list is correct', () => {
        // There are totally 3 such elements
        cy.get('input[type="radio"]').should('have.length', 3)

        cy.get('input[type="radio"]').eq(0).should('have.text','HTML').and('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('have.text','CSS').and('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('have.text','JavaScript').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that checkbox list is correct', () => {
        // Create test similar to previous one
    })

    it('Car dropdown is correct', () => {
        //TODO Add test for verification car dropdown (size) and its contents
    })

    it('Education dropdown is correct', () => {
        // Create test similar to previous one
    })
})

function inputValidData() {
    cy.log('Username will be filled')
    cy.get('#username').type('Something')
    cy.get('#email').type('validemail@yeap.com')
    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')

    // Birtday can show one placeholder, but pattern to input is YYYY-MM-DD
    cy.get('#birthday').type('2022-02-01')
    cy.get('input[name="password"]').type('MyPass')
    cy.get('[name="confirm"]').type('MyPass')
    cy.get('[name="confirm"]').type('InvalidMyPass')
    cy.get('h2').contains('Password').click()
}

