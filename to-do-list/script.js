// Selecting HTML elements
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

/**
 * Adds a new task to the task list.
 * Prevents adding duplicate tasks.
 */
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    // Check if task already exists
    const existingTasks = document.querySelectorAll("li");
    for (let task of existingTasks) {
        if (task.querySelector("span")?.textContent === taskText) {
            alert("This task already exists.");
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
    });

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.classList.add("delete-btn");

    // Add event listener for task deletion
    deleteBtn.addEventListener("click", () => {
        taskItem.remove();
    });

    // Append elements to task item
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskLabel);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);

    // Clear input field
    taskInput.value = "";
}

// Event listeners for task actions
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});
