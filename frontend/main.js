import './src/style/style.css'


const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText !== "") {
        const li = document.createElement("li");
        li.innerHTML = `
            ${taskText}
            <button class="delete">Delete</button>
        `;
        
        
        // Add the task to the task list
        taskList.appendChild(li);

        li.addEventListener('click', () => {
            const value = li.innerText
            li.innerText = ""
            const input = document.createElement('input');
            input.value =  value;
            li.appendChild(input);

            
        })
        
        // Clear the input
        taskInput.value = "";
        
        // Attach a click event to the delete button
        const deleteButton = li.querySelector("button.delete");
        deleteButton.addEventListener("click", function () {
            taskList.removeChild(li);
        });
    }
}

// Add a task when the "Add" button is clicked
addTaskButton.addEventListener("click", addTask);

// Add a task when Enter key is pressed in the input field
taskInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

  
