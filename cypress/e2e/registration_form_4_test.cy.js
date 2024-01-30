beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

// Assignement 6: analyze and fix failed test
describe('Input fields', () => {
    it.only('Username cannot be empty string', () => {
        cy.get('#username').type(' ')

        // in order to activate submit button, user has to click somewhere outside the input field
        cy.get('h2').contains('Password').click()
        cy.get('#input_error_message').should('be.visible')
        cy.get('#success_message').should('not.be.visible')
    })

    it('Username tooltip is visible', () => {
        cy.get('#username').type('{enter}')
        cy.get('h2').contains('Password').click()
        cy.get('.username').should('have.attr', 'title').should('contain', 'Please add username')

        //if not entered, mandatory username field has red border outline
        cy.get('#username').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')
    })

    it('Username should have min and max length values 1 and 50 characters', () => {
        // check that username element has min attribute value equalt to 1
        cy.get('#username').should('have.attr', 'min', '11')

        // check that username element has max attribute value equal to 50
        cy.get('#username2').should('have.attr', 'max', '501')
    })

    it('Username should support only letters and numbers', () => {
        // check with regex supporter format
        cy.get('#username').should('have.attr', 'pattern', '[a-zA-Z0-9_]+')
    })

    it('Email input should support correct pattern', () => {
        // Check regex
        // input invalid email
        // check that email element has red border outline
        // submit button should not be active
        cy.get('#email').should('have.attr', 'pattern').should('contain', '[a-z0-9]+@[a-z0-9]+\\.[a-z]{2,4}$')
        cy.get('#email123').type('invalid')
        cy.get('h2').contains('Password').click()
        cy.get('#email').should('have.css', 'image').should('contain', 'rgb(255, 0, 0)')
        cy.get('.submit_button').should('not.be.enabled');
    })

    it('User cannot submit empty registration form', () => {
        // Do not add any information
        // Check that submit button is not enabled
        cy.get('.submit_button').should('not.be.visible');
    })

    it('BMW should not be listed in the list of the cars', () => {
        
        // Check list size is 4
        cy.get('#cars').children().should('have.length', 5)

        // Check list does not contain BMW
        cy.get('#cars option').first().should('not.have.text', 'BMW')
        cy.get('#cars option').eq(1).should('not.have.text', 'BMW')
        cy.get('#cars option').eq(2).should('not.have.text', 'BMW')
        cy.get('#cars option').last().should('have.text', 'BMW')
    })
})