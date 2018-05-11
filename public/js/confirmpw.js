var password = document.getElementById("materialFormCardPasswordEx1"),
    confirm_password = document.getElementById("materialFormCardPasswordEx2");

function validatePassword() {
    if ((confirm_password.value!='')&&(password.value != confirm_password.value)) {
        confirm_password.setCustomValidity("Passwords Don't Match");
    } else {
        confirm_password.setCustomValidity('');
    }
}

password.oninput = validatePassword;
confirm_password.oninput = validatePassword;
