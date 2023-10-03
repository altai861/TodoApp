const taskManager = {
    tasks: [],


    addTask: function (main) {
        const task = {
            main: main,
        }

        this.tasks.push(task);
        this.saveTasks();
        this.displayTasks();
    },

    showDeleteConfirmation: function () {
        const deleteConfirmationModal = document.getElementById("deleteConfirmationModal")
        deleteConfirmationModal.style.display = "block";
    },

    hideDeleteConfirmation: function () {
        const deleteConfirmationModal = document.getElementById("deleteConfirmationModal")
        deleteConfirmationModal.style.display = "none";
    },

    deleteTask: function (index, listItem) {
        this.showDeleteConfirmation();
        const deleteConfirmationModal = document.getElementById("deleteConfirmationModal");
        deleteConfirmationModal.addEventListener("click", function (event) {
            if (event.target.id === "confirmDelete") {
                this.tasks.splice(index, 1);
                this.saveTasks();
                this.displayTasks();
            };
            this.hideDeleteConfirmation();
        })
    },

    saveTasks: function () {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },


    loadTasks: function () {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            this.tasks = JSON.parse(storedTasks);
        }
        this.displayTasks();
    },


    displayTasks: function () {
        const taskList = document.querySelector('.todo-list');
        taskList.innerHTML = "";

        this.tasks.forEach((task , index) => {
            const listItem = document.createElement("div");
            const mainText = document.createElement("p");
            listItem.classList.add("todo-item")
            mainText.textContent = task.main;

            const deleteIcon = document.createElement("i");
            deleteIcon.classList = "fas fa-trash-alt delete-task"

            listItem.appendChild(mainText);
            listItem.appendChild(deleteIcon);

            deleteIcon.addEventListener('click', () => { // Add the "removing" class to trigger the animation
                this.deleteTask(index, listItem);
            });

            taskList.appendChild(listItem)
        })
    }
}

const taskInput = document.getElementById("todo-input");
taskInput.addEventListener('keyup', function (event) {
    if (event.key === "Enter" && taskInput.value.trim() !== "") {
        taskManager.addTask(taskInput.value.trim())
        console.log(taskManager.tasks)
        taskInput.value = "";
    }
})

taskManager.loadTasks();