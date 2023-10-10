import listsList from "./defaultLists";

class App {
    constructor() {
        this.listsContainer = document.querySelector(".lists");
        this.listsList = document.querySelector(".lists-list")
        this.tasksContainer = document.querySelector(".tasks");
        this.tasksList = document.querySelector(".tasks-list")
        this.singleTaskContainer = document.querySelector(".single-task");

        this.lists = [];
        this.tasks = [];
        this.loadFromLocalStorage();

        this.render();

    }

    loadFromLocalStorage() {
        const lists = localStorage.getItem("lists");
        const tasks = localStorage.getItem("tasks");

        if (!lists || !tasks) {
            this.lists = listsList;
            this.saveLists();
        }
        this.lists = lists;
        this.tasks = tasks;
    }

    saveLists() {
        localStorage.setItem("lists", this.lists);
    }

    saveTasks() {
        localStorage.setItem("tasks", this.tasks);
    }


    render() {
        console.log("rendering");
        this.lists.map((list)=> {
            const listItem = document.createElement("li");
            listItem.textContent = list.name;
            this.listsList.appendChild(listItem);
        })

    }
}

const app = new App();