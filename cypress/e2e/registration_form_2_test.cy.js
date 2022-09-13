import {applicationFormWithInvalidUsername, inputPasswords} from "../support/reusable_functions";

beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

// Structure and visual tests before any actions
describe('Section 1: Main elements on page are correct', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
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
        cy.url().should('contain', '/registration_form_1.html')
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
        cy.get('h2').contains('Input username').click()
        // Get username field CSS with value box-shadow and check that this value contains red(RGB) value
        cy.get('#username').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')
        // By default, Cypress support only RGB values. HEX and other formats will need chai-colors
        cy.get('[data-testid="userInput"]').should('have.css', 'color', 'rgb(0, 0, 255)')
    })

    it('Application show error when input is invalid', () => {
        applicationFormWithInvalidUsername('{backspace}', 'Please fill out this field.', 6)
        cy.window().scrollTo('bottom')
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('have.css', 'display', 'none')

        cy.window().scrollTo('top')
        // Phone number is added in previous applicationFormWithInvalidUsername, that why number of invalid fields changed from 6 to 5
        applicationFormWithInvalidUsername(' ', 'Please match the requested format.', 5)
        cy.window().scrollTo('bottom')
        cy.get('.submit_button').should('be.disabled')
        cy.get('#input_error_message').should('have.css', 'display', 'block')
        cy.get('#success_message').should('have.css', 'display', 'none')
        cy.get('input').then(options => {
            expect(options).to.have.attr('required')
        })
    })

    it('Check what list of options is present for Radio buttons', () => {
        // List of elements in radio button section is correct
        /*
        First get all input - radio buttons,
        then get all siblings - different 15 elements, then we should get more specific by using Regular Expression:
        ^ - starts with
        $ - end with
        our example: label[for= that ends with FavLanguage]
        in html:
        <label for="htmlFavLanguage">HTML</label> ...
        <label for="cssFavLanguage">CSS</label> ...

        .then list of radioButtonsLabels should be parsed with [...array]
        .map(each element of parsed array => get innerText of this single element from ...array
        now expect et anywhere in this single element one of [HTML, CSS or JavaScript] is present
         */
        const featuresSelector = 'label[for$="FavLanguage"]';

        cy.get('input[type="radio"]').siblings(`${featuresSelector}`).then(labelsOfRadioButtons => {
            console.log('Here will be radio buttons:' + `${labelsOfRadioButtons}`)
            const actual = [...labelsOfRadioButtons].map(singleRadioButtonLabel => singleRadioButtonLabel.innerText)
            expect(actual).to.deep.eq(['HTML', 'CSS', 'JavaScript'])
        })
        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
    })

    it('Check what list of cars can be selected', () => {
        // Using 2 classes in chain to select checkboxes of vehicles
        cy.get('.checkbox.vehicles').should('have.length', 3)
        // .next can select simply next element in DOM
        cy.get('.checkbox.vehicles').eq(0).next().should('have.text', 'I have a bike').and('not.be.checked')
    })
})

describe('Section 2: Input fields support only correct patterns', () => {
    it('User can submit form with valid data', ()=>{
        inputValidData(true, true)
        cy.get('.submit_button', {timeout: 10000}).should('be.enabled');
        cy.get('.submit_button').click()
    })

    it('Check that email has pattern check', () => {
        // Check supported format
        cy.get('#email').should(($input) => {
            const emailPattern = $input.get(0).attributes.getNamedItem('pattern').value
            expect(emailPattern).contains('@', 'Pattern should contain @')
            console.log('Email pattern: ' + `${emailPattern}`)
        })
        // Input invalid email
        cy.get('#email').type('wrongemail.com').invoke('prop', 'validationMessage').should('contain', '@')
            .and('contain', 'email')
        cy.get('h2').contains('Input username').click()
        cy.get('#email').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')

        // Don't forget that previous state of test should be cleared
        cy.get('#email').clear()
        cy.get('#email').type('validemail@yeap.com')
        cy.get('h2').contains('Input username').click()
        cy.get('#email').should('have.css', 'box-shadow').should('not.contain', 'rgb(255, 0, 0)')
    })

    it('Check date input', () => {
        const today = new Date().toLocaleDateString('en-ca')
        // By default, date should be empty
        // scrollIntoView will scroll page to current element
        // Assert format that this input can get mm/ dd/ yyyy
        // Assert that birthday can be only with past dates, or today
        cy.get('#birthday').scrollIntoView().should('have.value', '')
            .and('have.attr', 'type', 'date')
            .and('have.attr', 'max', `${today}`)
    })

    it('Check what fields are mandatory', () => {
        // Assert that mandatory list on input fields is correct
        cy.get("input").should('have.attr', 'required')
    })

    it('Check that submit button cannot be selected if username is empty', () => {
        // Submit button by default is disabled and cannot be clicked
        cy.get('button[class="submit_button"]').should('be.disabled')
        // If one of mandatory fields show error - submit button is disable
        inputValidData(false, true)
        cy.get('button[class="submit_button"]').should('be.disabled')
    })

    it('Check that submit button cannot be selected if username is empty', () => {
        // If passwords are different - submit button is disabled
        inputValidData(true, false)
        cy.get('[name="confirm"]').type('else')
        cy.get('button[class="submit_button"]').should('be.disabled')
        cy.get('#password_error_message').should('be.visible')
    })
})

function inputValidData(usernameFilled, validPassword) {
    if (usernameFilled){
        cy.log('Username will be filled')
        cy.get('#username').type('Something')
    } else {
        cy.log('Username will be ignored')
    }
    cy.get('#email').type('validemail@yeap.com')
    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    // Birtday can show one placeholder, but pattern to input is YYYY-MM-DD
    cy.get('#birthday').type('2022-02-01')
    cy.get('input[name="password"]').type('MyPass')
    if (validPassword){
        cy.get('[name="confirm"]').type('MyPass')
    } else {
        cy.get('[name="confirm"]').type('InvalidMyPass')
    }
    cy.get('h2').contains('Password').click()
}

