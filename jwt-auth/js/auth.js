export default class Auth {
    constructor() {
        document.querySelector("body").style.display = "none";
        const auth = localStorage.getItem("auth");
        this.validateAuth(auth);
    }

    validateAuth(auth) {
        if (!auth) {
            window.location.replace("/login.html");
        } else {
            const authData = JSON.parse(auth);
            console.log(authData.userId);
            document.querySelector("body").style.display = "block";
        }
    }

    logOut() {
        localStorage.removeItem("auth");
        window.location.replace("/");
    }
}