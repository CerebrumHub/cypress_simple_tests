beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_1.html')
})

// NB! this is copy of registration_form_1_test.cy.js
// This file was created to make actions on same code that will be next in Workshop 4

/*
Workshop 3 assignment:
1 and 2 - If you see this text and founded file location in project tree, great job!
3 - Find .type('MyPass') - should find 6, then click and duplicate with Ctrl + D, to find next use F3 and shift + F3
4 - Uncomment lines 17 - 23, you can use Ctrl + / while selecting multiple or single line
3 - Find and replace username2 to username
 */
describe('This is first test suite', () => {
    //TODO uncomment lines 17 - 23
    it('User can submit data only when valid mandatory values are added', () => {
        // cy.get('#username2').type('Tester 123')
        // cy.get('.phoneNumberTestId').type('1020304050')
        // cy.get('#firstName').type('John')
        // cy.get('#lastName').type('Doe')
        // cy.get('input[name="password"]').type('MyPass')
        // cy.get('[name="confirm"]').type('MyPass')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button', {timeout: 10000}).should('be.enabled');
        cy.get('.submit_button').click()

        // Assert that both input and password error messages are not shown
        // Assert that success message is visible
        cy.get('#input_error_message').should('have.css', 'display', 'none')
        cy.get('#password_error_message').should('have.css', 'display', 'none')
        cy.get('#success_message').should('have.css', 'display', 'block')
    });

    it('User cannot submit data when username is absent', () => {
        applicationFormWithInvalidUsername('{backspace}', 'Please fill out this field.')

        // Asserting that Submit button is disabled
        // Assert that success message is not visible
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('have.css', 'display', 'none')
        //NB! In that case error message will not appear as with invalid data test case, this is known issue
    })

    it('User cannot submit invalid characters as username', () => {
        applicationFormWithInvalidUsername(' ', 'Please match the requested format.')

        cy.get('.submit_button').should('be.disabled')
        cy.get('#input_error_message').should('have.css', 'display', 'block')
        cy.get('#success_message').should('have.css', 'display', 'none')
    })

    it('User can use only numbers for phone number', () => {
        // Asserting that attribute type=number is present - only numbers are supported
        cy.get('[data-testid="phoneNumberTestId"]').should('have.attr', 'type', 'number')
    })

    it('User can use only same both first and validation passwords', () => {
        applicationFormWithInvalidUsername('{backspace}', 'Please fill out this field.')
        cy.get('[data-testid="phoneNumberTestId"]').type('1020304050')
        inputPasswords('MyPassword', 'Another')
        cy.get('#username').type('{enter}')

        cy.get('#password_error_message').should('have.css', 'display', 'block')
        cy.get('#success_message').should('have.css', 'display', 'none')
    })

    function applicationFormWithInvalidUsername(username, tooltip) {
        // Checking form validation without making actions on form
        cy.get('#applicationForm').then(
            ($form) => expect($form[0].checkValidity()).to.be.false,
        )
        cy.get('#applicationForm :invalid').should('have.length', 1)

        // Checking tooltip with invalid data
        cy.get('#username').clear().type(`${username}`)
        cy.get('h2').contains('Password').click()
        cy.get('input[name="username2"]:invalid').invoke('prop', 'validationMessage').should('equal', `${tooltip}`)
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        inputPasswords('MyPassword', 'MyPassword')
    }

    function inputPasswords(input, confirmation) {
        cy.get('input[name="password"]').type(`${input}`)
        cy.get('[name="confirm"]').type(`${confirmation}`)
    }
})