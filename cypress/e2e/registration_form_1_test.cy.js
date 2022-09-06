describe('This is first test suite', ()=>{
    it('User can submit data only when valid mandatory values are added', ()=> {
        cy.visit('cypress/fixtures/registration_form_1.html')
        cy.get('#username').type('Tester 123')
        cy.get('[name="password"]').type('MyPass')
        cy.get('[name="confirm"]').type('MyPass')
        cy.get('[type="submit"]').click()
        // Fill values
            // Username: Tester123
            // Phone number
            // Password and confirmation - Password008
        // Assert that click button is enabled
        // Click submit button
        // Assert that button is clicked and no errors present
    });

    it('User cannot submit data when username is absent', ()=>{
        // Open page
        // Fill values
            // Phone number
            // Only valid passwords
        // Assert that click button is not enabled
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
})