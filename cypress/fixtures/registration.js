let submit_button = document.querySelector(".submit_button");
submit_button.disabled = true;

document.getElementById("success_message").style.display = "none"
document.getElementById("password_error_message").style.display = "none"
document.getElementById("input_error_message").style.display = "none"

// Input fields should be only string or numbers
function checkInputPattern(naming) {
    const element = document.querySelector(`input[name=${naming}]`);
    const pattern = element.getAttribute("pattern");
    const re = new RegExp(pattern);
    if (re.test(element.value)) {
        document.getElementById("input_error_message").style.display = "none"
        console.log('Input field has valid characters')
    } else {
        document.getElementById("input_error_message").style.display = "block"
        console.log('Input field has invalid character');
    }
}

// password and repeat password should be the same
function onChange() {
    const password = document.querySelector('input[name=password]');
    const confirm = document.querySelector('input[name=confirm]');
    if (confirm.value === password.value) {
        document.getElementById("input_error_message").style.display = "none"
        console.log('Checked that passwords have same values - valid')
    } else {
        document.getElementById("input_error_message").style.display = "block"
        console.log('Passwords are different');
    }
}

Array.from(document.getElementsByTagName("input")).forEach(function (inputField) {
    inputField.addEventListener("change", stateHandle)
})

function stateHandle() {
    // Will check if all class .input fields
    if (document.querySelectorAll(".input:placeholder-shown").length === 0) {
        submit_button.disabled = false; //button is enabled
        console.log('Submit button will be enabled')
    } else {
        submit_button.disabled = true; //submit_button remains disabled
        console.log('Submit button will be disable')
    }
}

function successMessage() {
    // show new HTML part with success message
    document.getElementById("success_message").style.display = "block"
    console.log('Showing success message')
}

// This will imitate loading for 2 seconds, and success message will be still present until loading is finished
const myForm = document.getElementById('applicationForm')
myForm.addEventListener('submit', handleSubmit)
let submitTimer

function handleSubmit(event) {
    event.preventDefault()
    submitTimer = setTimeout(() => {
        this.submit()
        console.log('Submitted after 5 seconds')
    }, 2000)
}

function cancel() {
    clearTimeout(submitTimer);
    console.log('Submit Canceled')
}

today = new Date().toLocaleDateString('en-ca')
document.getElementById("birthday").setAttribute("max", today);