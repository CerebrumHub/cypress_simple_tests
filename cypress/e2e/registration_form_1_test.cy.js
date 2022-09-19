beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_1.html')
})

// Workshop #4 assignment:
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
    it('User can submit data only when valid mandatory values are added', () => {
        cy.get('#username').type('Something')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('input[name="password"]').type('MyPass')
        cy.get('[name="confirm"]').type('MyPass')

        //in order to activate submit button, user has to click somewhere outside of the input fileds
        cy.get('h2').contains('Password').click()

        cy.get('.submit_button').should('be.enabled');
        cy.get('.submit_button').click()

        // Assert that both input and password error messages are not shown
        // next 2 lines check exactly the same, but using different approach
        cy.get('#input_error_message').should('not.be.visible')
        cy.get('#password_error_message').should('have.css', 'display', 'none')

        // Assert that success message is visible
        // next 2 lines check exactly the same, but using different approach
        cy.get('#success_message').should('be.visible')
        cy.get('#success_message').should('have.css', 'display', 'block')
    });

    it('User can use only same both first and validation passwords', () => {
        cy.get('#username').type('johnDoe')
        cy.get('#firstName').type('John')
        cy.get('#lastName').type('Doe')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('input[name="password"]').type('MyPass')
        cy.get('[name="confirm"]').type('MyPass123')
        cy.get('[name="confirm"]').type('{enter}')

        // Asserting that Submit button is disabled
        // Assert that success message is not visible
        cy.get('#password_error_message').should('be.visible').should('contain','Passwords do not match!')
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
    })

    it('User cannot submit data when username is absent', () => {
        cy.get('#username').type('a')
        cy.get('#firstName').type('John')
        cy.get('#lastName').type('Doe')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('input[name="password"]').type('MyPass')
        cy.get('[name="confirm"]').type('MyPass')
        cy.get('#username').clear().type('{enter}')

        // Asserting that Submit button is disabled
        // Assert that success message is not visible
        // Assert that correct error message is visible
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible').should('contain','Mandatory input field is not valid or empty!')
    })

    //Workshop #5: create following tests

    it('User cannot submit data when phone number is absent', () => {
        // Add test, similar to previous one with phone number field not filled in
        // All other fields should be entered correctly
        // Assert that submit button is not enabled and that successful message is not visible
    })

    it('User cannot submit data when password and/or confirmation password is absent', () => {
        // Add test, similar to previous one with password field not filled in
        // All other fields should be entered correctly
        // Assert that submit button is not enabled and that successful message is not visible
    })

    it('User cannot add letters to phone number', () => {
        // Verification, that phone number should contain only numbers
        cy.get('[data-testid="phoneNumberTestId"]').should('have.attr', 'type', 'number')

        // Add steps, when all fields are correctly filled in, except phone number
        // Try typing letters to phone number field
        // Assert that submit button is not enabled and that successful message is not visible
    })
})