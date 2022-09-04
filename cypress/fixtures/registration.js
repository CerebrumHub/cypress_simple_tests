// Input fields should be only string or numbers
function checkInputPattern(naming) {
    const element = document.querySelector(`input[name=${naming}]`);

    const pattern = element.getAttribute("pattern");
    const re = new RegExp(pattern);
    if (re.test(element.value)) {
        element.setCustomValidity('');
        console.log('Input field has valid characters')
    } else {
        element.setCustomValidity('Input field has invalid value');
        console.log('Input field has invalid character');
    }
}

// password and repeat password should be the same
function onChange() {
    const password = document.querySelector('input[name=password]');
    const confirm = document.querySelector('input[name=confirm]');
    if (confirm.value === password.value) {
        confirm.setCustomValidity('');
        console.log('Checked that passwords have same values - valid')
    } else {
        confirm.setCustomValidity('Passwords do not match');
        console.log('Passwords are different');
    }
}

function checkMandatoryFields() {
    // Radio button is not mandatory
    // One of checkboxes is mandatory
    // Check
    // Error if something is wrong
    // Submit should be disabled until all conditions are filled
}