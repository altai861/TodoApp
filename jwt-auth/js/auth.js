import axios from "axios";

export default class Auth {
    constructor() {
        document.querySelector("body").style.display = "none";
        const auth = localStorage.getItem("userId");
        this.validateAuth(auth);

        this.tasks = this.loadTasks(auth);
        console.log(this.tasks);
    }

    validateAuth(auth) {
        if (!auth) {
            window.location.replace("/login.html");
        } else {
            console.log(auth);
            document.querySelector("body").style.display = "block";
        }
    }

    async loadTasks(userId) {
        const response = await axios.get("http://localhost:3500/tasks", {
            
            userId: userId
            
        });
        return response.data;
    }

    logOut() {
        localStorage.removeItem("userId");
        window.location.replace("/");
    }
}