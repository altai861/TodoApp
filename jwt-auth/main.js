import './style.css'
import axios from 'axios';

document.addEventListener('DOMContentLoaded', async () => {

  const myday = document.getElementById("my-day-list");
  const important = document.getElementById("important-list");
  const planned = document.getElementById("planned-list");
  const alltasks = document.getElementById("all-tasks-list");

  const userId = localStorage.getItem("userId");

  const addListButton = document.getElementById("add-list");

  addListButton.addEventListener("click", (e) => {
    e.preventDefault();
    addNewList(userId);
  })

  validateAuth(userId);
  document.querySelector("#logout-button").addEventListener("click", (e) => {
    logOut();
  })

  
  myday.addEventListener("click", () => {
    loadMyDay(userId);
  })
  important.addEventListener("click", () => {
    loadImportant(userId);
  })
  planned.addEventListener("click", () => {
    loadPlanned(userId);
  })
  alltasks.addEventListener("click", () => {
    loadTasks(userId);
  })
  


  loadLists(userId);
  loadTasks(userId);

  document.addEventListener("click", () => {
    const contextMenus = document.querySelectorAll(".context-menu");
    contextMenus.forEach((menu) => {
      menu.style.display = "none";
    })
  })

})

async function addNewList(userId){
  const newListName = document.getElementById("new-list-input");
  console.log(newListName);

  await axios.post("http://localhost:3500/lists", {
    userId: userId,
    name: newListName.value
  })
  .then(function(response) {
    console.log('Response data:', response.data);
  })
  .catch((error) => {
    console.error("Error: ", error)
  })

  newListName.value = "";
  loadLists(userId);

}

function validateAuth(userId) {
  if (userId) {
    console.log(userId);
    document.querySelector("body").style.display = "block";
    return true
  } else {
    window.location.replace("/login.html");
    return false;
  }
}

function loadTasks(userId) {
  axios
  .get('http://localhost:3500/tasks', {
    params: {
      userId:userId
    },
  })
  .then((response) => {
    // Handle the response data
    console.log('Response data:', response.data);
    const tasks = document.getElementById("tasks");
    tasks.innerHTML = "";
    document.getElementById("lists-name").innerText = "All Tasks";
    response.data.forEach((task, i) => {

      const li = document.createElement("li");

      const div = document.createElement("div");
      const completedCheckbox = document.createElement("input");
      const textAndDueDateDiv = document.createElement("div");
      const text = document.createElement("p");
      const span = document.createElement("span");
      const importantCheckbox = document.createElement("input");

      completedCheckbox.type = "checkbox"
      completedCheckbox.checked = task?.completed;

      text.innerText = task?.mainText;

      span.classList.add("due-date")
      span.innerText = task.dueDate ? task.dueDate.split("T")[0] : '';

      importantCheckbox.type = "checkbox"
      importantCheckbox.checked = task?.important;

      textAndDueDateDiv.classList.add("text-dueDate-container");
      textAndDueDateDiv.appendChild(text);
      textAndDueDateDiv.appendChild(span);

      div.appendChild(completedCheckbox);
      div.appendChild(textAndDueDateDiv);
      div.appendChild(importantCheckbox);
      
      li.appendChild(div)

      li.classList.add("task-item")
      tasks.appendChild(li);

      li.addEventListener("contextmenu", (e) => {
        e.preventDefault(); // Prevent the default context menu
        const contextMenu = document.querySelector('#context-menu-task');
        contextMenu.style.display = 'block';
        contextMenu.style.left = e.clientX + 'px';
        contextMenu.style.top = e.clientY + 'px';
        const deletebutton = document.getElementById("delete-task");
        deletebutton.addEventListener("click", () => {
          deleteTask(task.taskId, loadTasks, userId)
        })
      })
    })
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
    
  });
}


function loadMyDay(userId) {
  axios
  .get('http://localhost:3500/tasks/myday', {
    params: {
      userId: userId
    },
  })
  .then((response) => {
    // Handle the response data
    console.log('Response data:', response.data);
    const tasks = document.getElementById("tasks");
    tasks.innerHTML = "";
    document.getElementById("lists-name").innerText = "My Day";
    response.data.forEach((task, i) => {
      const li = document.createElement("li");
      li.innerText = task?.mainText;
      tasks.appendChild(li);
    })
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
    
  });
}

function loadImportant(userId) {
  axios
  .get('http://localhost:3500/tasks/important', {
    params: {
      userId:userId
    },
  })
  .then((response) => {
    // Handle the response data
    console.log('Response data:', response.data);
    const tasks = document.getElementById("tasks");
    tasks.innerHTML = "";
    document.getElementById("lists-name").innerText = "Important";
    response.data.forEach((task, i) => {
      const li = document.createElement("li");
      li.innerText = task?.mainText;
      tasks.appendChild(li);
    })
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
    
  });
}
function loadPlanned(userId) {
  axios
  .get('http://localhost:3500/tasks/planned', {
    params: {
      userId:userId
    },
  })
  .then((response) => {
    // Handle the response data
    console.log('Response data:', response.data);
    const tasks = document.getElementById("tasks");
    tasks.innerHTML = "";
    document.getElementById("lists-name").innerText = "Planned";
    response.data.forEach((task, i) => {
      const li = document.createElement("li");
      li.innerText = task?.mainText;
      tasks.appendChild(li);
    })
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
    
  });
}

async function deleteTask (taskId, load, userId) {
  await axios.delete("http://localhost:3500/tasks", {
    params: {
      taskId: taskId
    }
  })
  .then(function(response) {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  }) 
  load(userId);
}

async function deleteList(userId, listId) {
  await axios.delete("http://localhost:3500/lists", {
    params: {
      userId: userId,
      listId: listId
    }
  })
  .then(function(response) {
    console.log(response.data)
  })
  .catch((error) => {
    console.error(error);
  })
  loadLists(userId);
}

function loadLists(userId) {
  axios
  .get('http://localhost:3500/lists', {
    params: {
      userId:userId
    },
  })
  .then((response) => {
    // Handle the response data
    const customLists = document.getElementById("custom-lists");
    customLists.innerHTML = "";
    console.log('Response data:', response.data);
    response.data.forEach((list, i) => {
      const li = document.createElement("li");
      li.classList.add("custom-lists");
      li.innerText = list?.listname;
      customLists.appendChild(li);

      li.addEventListener("click", () => {
        loadCustomListTasks(list.listId, list.userId, list.listname)
      })

      li.addEventListener("contextmenu", (e) => {
        e.preventDefault(); // Prevent the default context menu
        const contextMenu = document.querySelector('#context-menu-list');
        contextMenu.style.display = 'block';
        contextMenu.style.left = e.clientX + 'px';
        contextMenu.style.top = e.clientY + 'px';
        const deletebutton = document.getElementById("delete-list");
        deletebutton.addEventListener("click", () => {
          deleteList(userId, list.listId)
        })
      })
    })
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
    
  });
}



function loadCustomListTasks(listId, userId, listName) {
  axios
  .get('http://localhost:3500/tasks/listSpecific', {
    params: {
      listId: listId,
      userId: userId
    },
  })
  .then((response) => {
    // Handle the response data
    console.log('Response data:', response.data);
    const tasks = document.getElementById("tasks");
    tasks.innerHTML = "";
    document.getElementById("lists-name").innerText = listName;
    response.data.forEach((task, i) => {
      const li = document.createElement("li");
      li.innerText = task?.mainText;
      tasks.appendChild(li);
    })
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
    
  });
}


function logOut() {
  localStorage.removeItem("userId");
  window.location.replace("/login.html")
}

