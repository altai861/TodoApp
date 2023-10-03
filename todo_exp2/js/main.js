let tasks = []

const taskInput = document.getElementById("todo-input");
const taskList = document.querySelector(".todo-list")

const deleteConfirmationModal = document.getElementById("deleteConfirmationModal");
const confirmDeleteButton = document.getElementById("confirmDelete");
const cancelDeleteButton = document.getElementById("cancelDelete");

function showModal() {
    deleteConfirmationModal.style.display = "block";
}

function hideModal() {
    deleteConfirmationModal.style.display = "none";
}

function addTask() {
    const taskText = taskInput.value.trim()
    if (taskText !== "") {
        const newTask = document.createElement("div");
        newTask.classList.add("todo-item")
        const newTaskText = document.createElement("p");
        const deleteIcon = document.createElement("i");
        deleteIcon.classList = "fas fa-trash-alt delete-task"
        newTaskText.textContent = taskText;
        newTask.appendChild(newTaskText);
        newTask.appendChild(deleteIcon);
        taskList.appendChild(newTask);
        taskInput.value = ""
    }
}


taskInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
})


function deleteTask(event) {
    const taskItem = event.target.closest(".todo-item");
    if (taskItem) {
        showModal();
        deleteConfirmationModal.addEventListener("click", function (event) {
            if (event.target.id === "confirmDelete") {
                taskItem.classList.add("removing"); // Add the "removing" class to trigger the animation
                setTimeout(function () {
                    taskItem.remove(); // Remove the task after the animation completes
                }, 500);
                hideModal();
            } else if (event.target.id === "cancelDelete") {
                hideModal();
            } else if (event.target === deleteConfirmationModal) {
                hideModal();
            }
        })
    }
 }


taskList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-task")) {
        deleteTask(event)
    }
})


