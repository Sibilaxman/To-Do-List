function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    const li = document.createElement("li");
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.className = "done-btn";

    doneBtn.onclick = function () {
        taskSpan.classList.toggle("done");
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.onclick = function () {
        li.remove();
    };

    const buttonGroup = document.createElement("div");
    buttonGroup.appendChild(doneBtn);
    buttonGroup.appendChild(deleteBtn);

    li.appendChild(taskSpan);
    li.appendChild(buttonGroup);
    document.getElementById("taskList").appendChild(li);

    taskInput.value = "";
}
