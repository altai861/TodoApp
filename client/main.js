// Sample user data (for demonstration purposes)
const users = [
    { username: "altai", password: "password1" },
    { username: "goku", password: "password2" }
];

let currentUser = null;

function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    // Check if the user exists
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUser = user;
        showTodoApp();
    } else {
        alert("Invalid email or password. Please try again.");
    }
}

function register() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    // Check if the email is already registered
    if (users.some(u => u.username === username)) {
        alert("Please use a different username.");
    } else {
        users.push({ username, password });
        alert("Registration successful. You can now login.");
    }
}

function showTodoApp() {
    document.getElementById("auth-container").style.display = "none";
    document.getElementById("todo-container").style.display = "block";
    loadTasks();
}

function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();

    if (taskText) {
        const taskList = document.getElementById("task-list");
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-button" onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(li);
        taskInput.value = "";
    }
}

function deleteTask(button) {
    const taskList = document.getElementById("task-list");
    taskList.removeChild(button.parentElement);
}

function loadTasks() {
    // In a real app, you would fetch tasks from a server here.
    // For simplicity, we'll just add some example tasks.
    const tasks = ["Task 1", "Task 2", "Task 3"];

    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach(taskText => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-button" onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Check if the user is already logged in
if (currentUser) {
    showTodoApp();
}

document.addEventListener('DOMContentLoaded', showTodoApp())