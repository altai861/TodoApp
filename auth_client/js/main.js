const login_form = document.getElementById("login-form")
const username = document.querySelector("#username");
const password = document.querySelector('#password');

login_form.addEventListener('submit', (event) => {
    event.preventDefault();
    login(username.value, password.value)
    console.log(username.value + " , " + password.value);
})

