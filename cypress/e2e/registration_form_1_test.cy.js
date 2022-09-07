beforeEach(()=>{
    cy.visit('cypress/fixtures/registration_form_1.html')
})

describe('This is first test suite', ()=>{
    it('User can submit data only when valid mandatory values are added', ()=> {
        cy.get('#username').type('Tester 123')
        cy.get('.phoneNumberTestId').type('1020304050')
        cy.get('input[name="password"]').type('MyPass')
        cy.get('[name="confirm"]').type('MyPass')
        cy.get('.submit_button').click()

        // Assert that all mandatory fields with class .input do not have error
        cy.get('.input').should('not.have.class', ':invalid')
    });

    it('User cannot submit data when username is absent', ()=>{
        // Input backspace - will left the input as empty
        cy.get('#username').type('{backspace}')
        cy.get('#username').should('have.class', ':invalid')
        cy.get('.phoneNumberTestId').type('1020304050')
        cy.get('input[name="password"]').type('MyPass')
        cy.get('[name="confirm"]').type('MyPass')

        // Asserting that Submit button is disabled
        cy.get('.submit_button').should('be.disabled')
    })

    it('User can use only numbers for phone number', ()=>{
        // Open page
        // Fill values with numbers
        // Assert that string cannot be used as input data for phone number
    })

    it('User can use only same both first and validation passwords', ()=> {
        // Open page
        // Fill values - username and phone number
        // Input different passwords
        // Click submit button
        // Assert that error appears

        // Input same passwords
        // Click submit button
        // Assert that no error is present
    })

    // Ideas: https://stackoverflow.com/questions/65208169/how-to-validate-a-error-message-in-cypress it is possible to check
    // error message
})