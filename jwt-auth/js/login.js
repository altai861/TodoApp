import axios from "axios";

class Login {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;

        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.querySelector("#username").value;
            const password = document.querySelector("#password").value;
            this.login(username, password);
        })
    }

    async login(username, password) {

        await axios.post("http://localhost:3500/auth/login", {
            username: username,
            password: password
        })
        .then(function(response) {
            localStorage.setItem("userId", response.data.userId)
            window.location.replace("/");
            console.log(response.data);
        })
        .catch(function(error) {
            if (error.response && error.response.status === 401) {
                alert("Either username or password is wrong");
            } else {
                // Handle other errors, such as network issues or server errors
                console.error('Error:', error);
            }
        })
       
            
    }

    
}

const form = document.querySelector('#login-form');
if (form) {
    const fields = ["username", "password"];
    const validator = new Login(form, fields);
}