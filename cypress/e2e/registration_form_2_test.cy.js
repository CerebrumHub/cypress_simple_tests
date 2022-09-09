beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

// Structure and visual tests before any actions
describe('Section 1: Main elements on page are correct', () => {
    it('Check that logo is correct and has correct size', () => {
        // Check log href
        // Check log size
        // Check logo location?
    })

    it('Check that URL to CH is correct and clickable', () => {
        // CH URL is correct
        // After clicking button request is correct
        // After clicking correct page is loaded
        // When clicked and incorrect CH url - check 404 page
    })

    it('Check navigation part', () => {
        // Navigation bar has 2 elements - Registration form 1, CH homepage
        // URL for registration form 1 is correct
        // URL for CH homepage is correct
    })

    it('Check CSS text has correct values', () => {
        // input error show red boarder
        // headers has blue text
    })

    it('Application show error when input is invalid', () => {
        // empty fields - assert has boarder
        // empty fields - show correct tooltip
        // check list of html elements that should be mandatory and has required attribute
    })

    it('Check what list of options is present for Radio buttons', ()=>{
        // List of elements in radio button section is correct
        // Selecting one will remove selection from other radio button
    })

    it('Check what list of cars can be selected', ()=>{
        // Check list of checkbox elements
    })
})

describe('Section 2: Input fields support only correct patterns', ()=>{
    it('Check that email has pattern check', ()=>{
        // Input invalid email
        // Assert that email show error tooltip
        // Assert that error message is visible
        // Input valid email
        // No tooltip is present, error is not visible
        // Email should have limitations 1 - up to max length
    })

    it('Check date input', ()=>{
        // By default, date should be empty
        // Assert format that this input can get mm/ dd/ yyyy
        // Assert that birthday can be only with past dates, or today
    })

    it('Check what fields are mandatory', ()=>{
        // Assert that mandatory list on input fields is correct
    })

    it('Check that submit button can be selected only with mandatory values', ()=>{
        // Submit button by default is disabled and cannot be clicked
        // If one of mandatory fields show error - submit button is disable
        // If passwords are different - submit button is disabled
        // When all fields are correct - submit button is show and clickable
        // Clicking submit button will show success message
    })
})

describe('Section 5: Submitting form', ()=>{
    it('Check that on URL click request send is correct? - advanced', ()=>{
        // Something here
    })
})

