beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_1.html')
})

// Workshop 4 assignment:
//
// 1. Update the name of test suite by adding you name: “This is first test suite, John Smith”
// 2. Replace text ‘MyPass’ in the first test with your own chosen password (2 places) - passwords should match
// 3. Change phone number in the first test to 555666777
// 4. Change the order of steps in the first test:
//      -first set phone number
//      -then 2 password fields
//      -then username
// 5. Add comment to the first test containing today’s date

describe('This is first test suite', () => {
    it.only('User can submit data only when valid mandatory values are added', () => {
        cy.get('#username').type('Something')
        cy.get('#firstName').type('John')
        cy.get('#lastName').type('Doe')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('input[name="password"]').type('MyPass')
        cy.get('[name="confirm"]').type('MyPass')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button', { timeout: 10000 }).should('be.enabled');
        cy.get('.submit_button').click()

        // Assert that both input and password error messages are not shown
        // Assert that success message is visible
        cy.get('#input_error_message').should('have.css', 'display', 'none')
        cy.get('#password_error_message').should('have.css', 'display', 'none')
        cy.get('#success_message').should('have.css', 'display', 'block')
    });

    it.only('User cannot submit data when username is absent', () => {
        // Checking form validation without making actions on form
        cy.get('#applicationForm').then(({$form}) => {
            expect($form[0].checkValidity()).to.be.false
        })
        cy.get('#form-validation :invalid').should('have.length', 1)

        cy.get('#username').clear()
        cy.get('#username').should('have.class', ':invalid')
        cy.get('input[name="username"]:invalid').invoke('prop', 'validationMessage').should('equal', 'Please fill out this field.')
        cy.get('#phoneNumberTestId').type('1020304050')
        cy.get('input[name="password"]').type('MyPass')
        cy.get('[name="confirm"]').type('MyPass')

        // Asserting that Submit button is disabled
        // Assert that input error message is visible
        // Assert that success message is not visible
        cy.get('.submit_button').should('be.disabled')
        cy.get('#input_error_message').should('have.css', 'display', 'block')
        cy.get('#success_message').should('have.css', 'display', 'none')
    })

    it('User can use only numbers for phone number', () => {
        // Asserting that attribute type=number is present - only numbers are supported
        cy.get('#phoneNumberTestId').should('have.attr', 'type', 'number')
    })

    it('User can use only same both first and validation passwords', () => {
        cy.get('#username').clear()
        cy.get('#username').should('have.class', ':invalid')
        cy.get('#phoneNumberTestId').type('1020304050')
        cy.get('input[name="password"]').type('MyPass')
        cy.get('[name="confirm"]').type('Another')
        cy.get('#username').type('{enter}')

        cy.get('#password_error_message').should('have.css', 'display', 'block')
        cy.get('#success_message').should('have.css', 'display', 'none')
    })
})