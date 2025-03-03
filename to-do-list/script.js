const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

function addTask(){
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const taskItem = document.createElement("li");
    const checkbox = document.createElement("input");
    const taskLabel = document.createElement("span");
    const deleteBtn = document.createElement("button");

    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");
    taskLabel.textContent = taskText;
    deleteBtn.textContent = "🗑️";
    deleteBtn.classList.add("delete-btn");

    // ✅ Ajout des événements
    checkbox.addEventListener("change", () => {
        taskLabel.classList.toggle("completed", checkbox.checked);
    });

    deleteBtn.addEventListener("click", () => {
        taskItem.remove();
    });

    // ✅ Ajout des éléments dans la liste
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskLabel);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);

    // ✅ Réinitialisation du champ de saisie
    taskInput.value = "";
}

// ✅ Événement sur le bouton "Ajouter"
addTaskBtn.addEventListener("click", addTask);

// ✅ Permet d'ajouter une tâche en appuyant sur "Entrée"
taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});