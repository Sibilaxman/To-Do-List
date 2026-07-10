let currentUser = localStorage.getItem("currentUser");
const taskList = document.getElementById("taskList");

window.onload = function(){
  if(currentUser){
    document.getElementById("usernameInput").value = currentUser;
    loadTasks();
  }
};

function setUser(){
  const username = document.getElementById("usernameInput").value.trim();

  if(username === ""){
    alert("Please enter a username");
    return;
  }

  currentUser = username;
  localStorage.setItem("currentUser", currentUser);
  taskList.innerHTML = "";
  loadTasks();
}

function loadTasks(){
  const savedTasks = JSON.parse(localStorage.getItem(currentUser + "_tasks")) || [];
  savedTasks.forEach(task => createTaskElement(task.text, task.completed));
}

function addTask(){
  if(!currentUser){
    alert("Please set a username first");
    return;
  }

  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if(taskText === ""){
    alert("Please enter a task");
    return;
  }

  createTaskElement(taskText, false);
  saveTasks();
  taskInput.value = "";
}

function createTaskElement(taskText, completed){
  const li = document.createElement("li");

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  if(completed){
    taskSpan.classList.add("done");
  }

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "Done";
  doneBtn.className = "done-btn";
  doneBtn.onclick = function(){
    taskSpan.classList.toggle("done");
    saveTasks();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = function(){
    li.remove();
    saveTasks();
  };

  const buttonGroup = document.createElement("div");
  buttonGroup.appendChild(doneBtn);
  buttonGroup.appendChild(deleteBtn);

  li.appendChild(taskSpan);
  li.appendChild(buttonGroup);
  taskList.appendChild(li);
}

function saveTasks(){
  const tasks = [];

  document.querySelectorAll("#taskList li").forEach(li => {
    const taskText = li.querySelector("span").textContent;
    const completed = li.querySelector("span").classList.contains("done");

    tasks.push({
      text: taskText,
      completed: completed
    });
  });

  localStorage.setItem(currentUser + "_tasks", JSON.stringify(tasks));
}
