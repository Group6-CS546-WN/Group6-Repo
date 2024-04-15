// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!
document.getElementById('registration-form').addEventListener('submit', function(event) {
    let errors = [];
    const firstName = document.getElementById('firstNameInput').value;
    if (!firstName || firstName.length < 2 || /\d/.test(firstName)) errors.push("Invalid first name");

    const lastName = document.getElementById('lastNameInput').value;
    if (!lastName || lastName.length < 2 || /\d/.test(lastName)) errors.push("Invalid last name");

    const emailAddress = document.getElementById('emailAddressInput').value;
    if (!emailAddress || !/^\S+@\S+\.\S+$/.test(emailAddress)) errors.push("Invalid email address");

    const password = document.getElementById('passwordInput').value;
    const confirmPassword = document.getElementById('confirmPasswordInput').value;
    if (password !== confirmPassword) errors.push("Passwords do not match");
    if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password) || !/\W/.test(password)) errors.push("Password does not meet complexity requirements");

    if (errors.length > 0) {
        event.preventDefault();
        alert(errors.join("\n"));
    }
});
