import './style.css'
import axios from 'axios';

document.addEventListener('DOMContentLoaded', async () => {

  const customLists = document.getElementById("custom-lists");
  const myday = document.getElementById("my-day-list");
  const important = document.getElementById("important-list");
  const planned = document.getElementById("planned-list");
  const alltasks = document.getElementById("all-tasks-list");
  const userId = localStorage.getItem("userId");

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

})

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
      li.innerText = task?.mainText;
      tasks.appendChild(li);
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
    console.log('Response data:', response.data);
    response.data.forEach((list, i) => {
      const li = document.createElement("li");
      li.innerText = list?.listname;
      customLists.appendChild(li);

      li.addEventListener("click", () => {
        loadCustomListTasks(list.listId, list.userId, list.listname)
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

