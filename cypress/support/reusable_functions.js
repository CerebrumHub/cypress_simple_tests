export function applicationFormWithInvalidUsername(username, tooltip, numberOfInvalidFields) {
    // Checking form validation without making actions on form
    cy.get('#applicationForm').then(
        ($form) => expect($form[0].checkValidity()).to.be.false,
    )
    cy.get('#applicationForm :invalid').should('have.length', `${numberOfInvalidFields}`)

    // Checking tooltip with invalid data
    cy.get('#username').clear().type(`${username}`)
    cy.get('h2').contains('Password').click()
    cy.get('input[name="username"]:invalid').invoke('prop', 'validationMessage').should('equal', `${tooltip}`)
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    inputPasswords('MyPassword', 'MyPassword')
}

export function inputPasswords(input, confirmation) {
    cy.get('input[name="password"]').type(`${input}`)
    cy.get('[name="confirm"]').type(`${confirmation}`)
}
