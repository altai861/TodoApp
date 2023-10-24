import axios from "axios";

class Register {
    constructor(form) {
        this.form = form;
        
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm-password").value;
            if (password !== confirmPassword) {
                alert("Confirmed password does not match the password");
            } else {
                this.register(username, email, password);
            }
        })
    }

    async register(username, email, password) {
        await axios.post("http://localhost:3500/auth/register", {
            username: username,
            email: email,
            password: password
        })
        .then(function(response) {
            console.log(response.data);
            alert("Your account created");
            window.location.replace("/login.html");
        })
        .catch(function(error) {
            if (error.response && error.response.status === 409) {
                alert("Duplicate username");
            } else {
                // Handle other errors, such as network issues or server errors
                console.error('Error:', error);
            }
        })
    }
}

const form = document.getElementById("register-form")
const register = new Register(form);