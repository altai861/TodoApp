import axios from "axios";

export default class app {
    constructor() {
        this.user = JSON.parse(localStorage.getItem("auth"))
        this.userId = user.userId;
        this.accessToken = user.accessToken;
        this.loadTasks();
    }

    loadTasks() {

    }
}