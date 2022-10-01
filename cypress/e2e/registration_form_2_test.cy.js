beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

// Workshop #6 create following tests:

describe('Section 1: Functional tests', () => {
    it('User can submit form with valid data and only mandatory fields added', ()=>{
        // Add test steps for filling in ONLY mandatory fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system show successful message
    })

    it('User can submit form with all fields added', ()=>{
        // Add test steps for filling in ALL fields
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
        // Array has totally 4 elements
        cy.get('input[type="radio"]').should('have.length', 4)
        /*
        .next() is needed because of HTML structure:
        <input type="radio" id="htmlFavLanguage" name="fav_language" value="HTML">
        <label for="htmlFavLanguage">HTML</label><br>
         */
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that checkbox list is correct', () => {
        // Create test similar to previous one
    })

    it('Car dropdown is correct', () => {
        // Select second element and create screenshot for this area, and full page
        // Don't forget to delete files and comment back if not using
        // cy.get('#cars').select(1).screenshot('Cars drop-down')
        // cy.screenshot('Full page screenshot')

        // Different solutions how get array length of elements in Cars dropdown
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Favourite animal dropdown is correct', () => {
        // Create test similar to previous one
    })
})

function inputValidData() {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('Something')
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    // If element has multiple classes, then one of them can be used
    cy.get('.password').type('MyPass')
    // To get multiple classes user .class1.class2 selector
    cy.get('.input.confirm').type('MyPass')
    cy.get('[name="confirm"]').type('InvalidMyPass')
    cy.get('h2').contains('Password').click()
}

