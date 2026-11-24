const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const resetBtn = document.getElementById("resetBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const taskCounter = document.querySelector("#taskCounter strong");
const dateTime = document.getElementById("dateTime");

function showDateTime() {
    const today = new Date();
    dateTime.textContent = today.toLocaleString();
}

setInterval(showDateTime, 1000);
showDateTime();

function updateCounter() {
    let total = taskList.children.length;
    taskCounter.textContent = total;

    if (total === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}

function addTask() {
    let text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    let li = document.createElement("li");
    li.className = "task-item";

    li.innerHTML = `
        <span class="task-text">${text}</span>

        <div class="task-buttons">
            <button class="edit-btn">
                <i class="fa-solid fa-pen"></i> Edit
            </button>

            <button class="delete-btn">
                <i class="fa-solid fa-trash"></i> Delete
            </button>
        </div>
    `;

    taskList.appendChild(li);

    taskInput.value = "";
    taskInput.focus();

    updateCounter();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

updateCounter();taskList.addEventListener("click", function(e) {

    // Delete Task
    if (e.target.closest(".delete-btn")) {

        if (confirm("Do you want to delete this task?")) {

            let li = e.target.closest(".task-item");
            li.remove();        }

        updateCounter();
    }

    // Edit Task
    if (e.target.closest(".edit-btn")) {

        let li = e.target.closest(".task-item");
        let taskText = li.querySelector(".task-text");

        let updatedTask = prompt("Edit your task:", taskText.textContent);

        if (updatedTask !== null) {

            updatedTask = updatedTask.trim();

            if (updatedTask !== "") {
                taskText.textContent = updatedTask;
            }
        }
    }

});

// Reset All Tasks
resetBtn.addEventListener("click", function() {

    if (taskList.children.length === 0) {
        alert("Task list is already empty.");
        return;
    }

    if (confirm("Are you sure you want to remove all tasks?")) {

        taskList.innerHTML = "";

        updateCounter();

        taskInput.focus();
    }

});