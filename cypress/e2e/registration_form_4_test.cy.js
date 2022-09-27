beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

// Workshop #10 analyze and fix failed test

describe('Section 1: Functional tests', () => {
    it('Check that logo is correct and has correct size', () => {
       //TODO
    })
})

describe('Input fields', ()=>{
    it('Username cannot be empty string', ()=>{
        cy.get('#username').type('{backspace}')
        cy.window().scrollTo('bottom')
        cy.get('#input_error_message').should('be.visible')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#password_error_message').should('have.css', 'display', 'none')
        cy.get('.submit_button').click()
    })

    it('Username tooltip changes depending on input value', ()=>{
        // use applicationFormWithInvalidUsername

        // get username
        // empty field should show - Please add username
        // add faulty string
        // input field with wrong format - Input field contains not supported character
        // If data is valid then no tooltip is present
    })

    it('Username support only string characters', ()=>{
        // get username
        // type =
        // check that error at the bottom is correct
        // Check that tooltip is correct
        // submit button is not active
    })

    it('Username should have max length of 50 characters', ()=>{
        // check that HTML has max attribute value
    })

    it('Username should support only lower letters and numbers', ()=>{
        // check with regex supporter format
    })

    it('Email input should support correct pattern', ()=>{
        // String@string.sufix
        // Check regex
        // input valid data
        // input invalid email
        // check that tooltip is same as expected
        // field should have correct CSS style
        // submit button should not be active
        // change to valid email
        // submit button should be selectable
    })

    it('Passwords cannot be empty string', ()=>{
        // input valid data
        // input empty password
        // input confirm password also as empty
        // Check that submit button is not active
    })

    it('Table should contain correct data', ()=>{
        // Check that table has correct size
        // Check data inside table
        // Check that Faulty value is not present in table
    })

    it('User cannot submit empty registration form', ()=>{
        // Empty all input fields
        // Check that submit button is not present
    })

    it('HTML should be present in Web Languages radio buttons list', ()=>{
        // get list
        // check that at least one of elements is HTML
    })

    it('BMW should not be listed in cars list', ()=>{
        // Check list does not contain BMW
    })


})