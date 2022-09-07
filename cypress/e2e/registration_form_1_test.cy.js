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

        // Assert that both input and password error messages are not shown
        // Assert that success message is visible
        cy.get('#input_error_message').should('have.css', 'display', 'none')
        cy.get('#password_error_message').should('have.css', 'display', 'none')
        cy.get('#success_message').should('have.css', 'display', 'block')
    });

    it('User cannot submit data when username is absent', ()=>{
        cy.get('#username').clear()
        cy.get('#username').should('have.class', ':invalid')
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

    it('User can use only numbers for phone number', ()=>{
        // Asserting that attribute type=number is present - only numbers are supported
        cy.get('#phoneNumberTestId').should('have.attr', 'type', 'number')
    })

    it('User can use only same both first and validation passwords', ()=> {
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