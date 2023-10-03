class TodoApp {
    constructor() {
        this.taskInput = document.querySelector("#todo-input");
        this.taskList = document.querySelector(".todo-list");
        this.completedList = document.querySelector(".completed-list")
        this.tasks = []

        this.taskInput.addEventListener("keyup", this.handleTaskInput.bind(this));
        this.loadTasks();

    }


    handleTaskInput(event) {
        if (event.key === 'Enter' && this.taskInput.value.trim() !== '') {
            const taskText = this.taskInput.value.trim();
            const task = new Task(taskText);
            this.tasks.unshift(task);
            this.saveTasks();
            this.displayTasks();
            this.taskInput.value = '';
          }
    }

    displayTasks() {
        this.taskList.innerHTML = ""
        this.completedList.innerHTML = ""

        this.tasks.forEach((task, index) => {
            const listItem = document.createElement('div');
            listItem.classList.add("todo-item")

            const checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.classList.add("task-checkbox");
            checkbox.checked = task.completed;
            checkbox.addEventListener("change", () => this.toggleTaskCompletion(index))
            listItem.appendChild(checkbox)


            const mainText = document.createElement("p");
            mainText.textContent = task.text;
            listItem.appendChild(mainText);
            mainText.classList.toggle('completed', task.completed);

            const deleteButton = document.createElement('i');
            deleteButton.classList = "fas fa-trash-alt delete-task"

            deleteButton.addEventListener('click', () => this.deleteTask(index));
            listItem.appendChild(deleteButton);
            
            if (task.completed) {
                this.completedList.appendChild(listItem)
            } else {
                this.taskList.appendChild(listItem)
            }
            
        });
    }

    toggleTaskCompletion(index) {
        this.tasks[index].toggleCompletion();
        this.saveTasks();
        this.displayTasks();
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
        this.displayTasks();
      }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
          this.tasks = JSON.parse(storedTasks).map(taskData => new Task(taskData.text, taskData.completed));
        }
        this.displayTasks();
    }
}

class Task {
    constructor(text, completed = false) {
      this.text = text;
      this.completed = completed;
    }

    toggleCompletion() {
      this.completed = !this.completed;
    }
  }



const app = new TodoApp();