let tasks = []

const taskInput = document.getElementById("todo-input");
const taskList = document.querySelector(".todo-list")

function addTask() {
    const taskText = taskInput.value.trim()
    if (taskText !== "") {
        const newTask = document.createElement("div");
        newTask.classList.add("todo-item")
        const newTaskText = document.createElement("p");
        newTaskText.textContent = taskText;
        newTask.appendChild(newTaskText);
        taskList.appendChild(newTask);


        taskInput.value = ""
    }
}


taskInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
})