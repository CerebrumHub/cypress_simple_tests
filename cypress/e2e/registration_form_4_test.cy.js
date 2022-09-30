beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

// Workshop #10 analyze and fix failed test
describe('Input fields', ()=>{
    it('Username cannot be empty string', ()=>{
        cy.get('#username').type(' ')
        cy.window().scrollTo('bottom')
        cy.get('h2').contains('Password').click()
        cy.get('#input_error_message').should('be.visible')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#password_error_message').should('have.css', 'display', 'none')
    })

    it('Username tooltip changes depending on input value', ()=>{
        // get username
        // empty field should show - Please add username
        // add faulty string
        // input field with wrong format - Input field contains not supported character
        // If data is valid then no tooltip is present
        cy.get('#username').type('{backspace}')
        cy.get('h2').contains('Password').click()
        cy.get('#username').should('have.attr', 'title').should('contain', 'Please add username')
        cy.get('#username').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')
        cy.get('input[name="username"]:invalid').invoke('prop', 'validationMessage').should('contain', 'fill out this field')
    })

    it('Username support only string characters', ()=>{
        // get username
        // type =
        // check that error at the bottom is correct
        // Check that tooltip is correct
        // submit button is not active
        cy.get('input[name="username"]:invalid')
            .invoke('prop', 'validationMessage').should('contain', 'fill out this field')
        cy.get('input[name="username"]').type('=')
        cy.get('h2').contains('Password').click()
        cy.get('input[name="username"]').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')
        cy.get('#input_error_message').should('be.visible').should('have.css', 'display', 'block')
        cy.get('.submit_button').should('not.be.enabled');
    })

    it('Username should have max length of 50 characters', ()=>{
        // check that HTML has max attribute value
        cy.get('#username').should('have.attr', 'max', '50')
    })

    it('Username should support only lower letters and numbers', ()=>{
        // check with regex supporter format
        cy.get('#username').should('have.attr', 'pattern', '[a-zA-Z0-9_]+')
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
        cy.get('#email').should('have.attr', 'pattern').should('contain', '@')
        cy.get('#email:invalid').invoke('prop', 'validationMessage').should('contain', 'fill out this field')
        cy.get('#email').type('invalid')
        cy.get('h2').contains('Password').click()
        cy.get('#email').should('have.css', 'color').should('contain', 'rgb(0, 0, 0)')
        cy.get('.submit_button').should('not.be.enabled');
        cy.get('#email').clear().type('invalid@email.com')
    })

    it('Passwords cannot be empty string', ()=>{
        // input valid data
        // input empty password
        // input confirm password also as empty
        // Check that submit button is not active
        cy.get('.input.confirm').type('{backspace}')
        cy.get('[name="confirm"]').type('{backspace}')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('not.be.enabled');
    })

    it('User cannot submit empty registration form', ()=>{
        // Empty all input fields
        // Check that submit button is not present
        cy.get('input[type=text]').clear()
        cy.get('.submit_button').should('not.be.enabled');
    })

    it('HTML should be present in Web Languages radio buttons list', ()=>{
        // get list
        // check that at least one of elements is HTML
        cy.get('input[type=radio]').next().then(labelsOfRadioButtons => {
            console.log('Here will be radio buttons:' + `${labelsOfRadioButtons}`)
            const actual = [...labelsOfRadioButtons].map(singleRadioButtonLabel => singleRadioButtonLabel.innerText)
            expect(actual).to.deep.eq(['HTML', 'CSS', 'JavaScript', 'PHP'])
        })
    })

    it('BMW should not be listed in cars list', ()=>{
        // Check list does not contain BMW
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').first().should('not.have.text', 'Bayerische Motoren Werke')
    })
})