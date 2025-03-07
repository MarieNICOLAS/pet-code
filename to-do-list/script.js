// Selecting HTML elements
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const filterAll = document.getElementById("filter-all");
const filterActive = document.getElementById("filter-active");
const filterCompleted = document.getElementById("filter-completed");

/**
 * Saves the current task list to localStorage.
 * Each task is stored with its text and completion state.
 */
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("li").forEach(task => {
        const taskText = task.querySelector("span").textContent;
        const isCompleted = task.querySelector("input").checked;
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/**
 * Loads tasks from localStorage and displays them in the task list.
 * If tasks exist in localStorage, they are recreated in the DOM with their previous completion state.
 */
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(task => {
        const taskItem = document.createElement("li");

        // Create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");
        checkbox.checked = task.completed;

        // Create task label
        const taskLabel = document.createElement("span");
        taskLabel.textContent = task.text;
        if (task.completed) taskLabel.classList.add("completed");

        // Add event listener to toggle completion
        checkbox.addEventListener("change", () => {
            taskLabel.classList.toggle("completed", checkbox.checked);
            saveTasks();
        });

        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️";
        deleteBtn.classList.add("delete-btn");

        // Add event listener for task deletion
        deleteBtn.addEventListener("click", deleteTask);

        // Append elements to task item
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskLabel);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
    });
}

/**
 * Adds a new task to the task list.
 * Prevents adding duplicate tasks and updates localStorage.
 */
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    // Check if task already exists
    const existingTasks = document.querySelectorAll("li");
    for (let task of existingTasks) {
        if (task.querySelector("span")?.textContent === taskText) {
            alert("La tâche existe déjà 😉");
            return;
        }
    }

    // Create task item
    const taskItem = document.createElement("li");

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");

    // Create task label
    const taskLabel = document.createElement("span");
    taskLabel.textContent = taskText;

    // Add event listener for completion toggle
    checkbox.addEventListener("change", () => {
        taskLabel.classList.toggle("completed", checkbox.checked);
        saveTasks();
    });

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", deleteTask);

    // Append elements to task item
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskLabel);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);

    // Update localStorage
    saveTasks();
    
    // Clear input field
    taskInput.value = "";
}

/**
 * Deletes a specific task from the task list.
 * Also updates localStorage after deletion.
 * @param {Event} event - The click event triggered by the delete button.
 */
function deleteTask(event) {
    const taskToRemove = event.target.parentElement;
    taskToRemove.remove();
    saveTasks();
}

/**
 * Filters tasks based on the selected category.
 * @param {string} filter - The filter type: "all", "active", or "completed".
 */
function filterTasks(filter) {
    const tasks = document.querySelectorAll("li");
    tasks.forEach(task => {
        const isCompleted = task.querySelector("input").checked;
        switch (filter) {
            case "all":
                task.style.display = "flex";
                break;
            case "active":
                task.style.display = isCompleted ? "none" : "flex";
                break;
            case "completed":
                task.style.display = isCompleted ? "flex" : "none";
                break;
        }
    });
}

// Event listeners for task actions
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

// Event listeners for task filtering
filterAll.addEventListener("click", () => filterTasks("all"));
filterActive.addEventListener("click", () => filterTasks("active"));
filterCompleted.addEventListener("click", () => filterTasks("completed"));

// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);
