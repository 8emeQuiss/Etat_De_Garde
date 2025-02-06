

  // Fonction pour charger les postes
  function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Vider la liste

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.textContent = task;

        let deleteBtn = document.createElement("button");
        deleteBtn.className ='btn-close';
        
        deleteBtn.onclick = () => deleteTask(index);

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Fonction pour ajouter une nouvelle tâche
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText !== "") {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = ""; // Vider l'input
        loadTasks(); // Mettre à jour l'affichage
    }
}

// Fonction pour supprimer une tâche
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

// Fonction pour vider toutes les postes
function clearTasks() {
    localStorage.removeItem("tasks");
    loadTasks();
}

// Charger les postes au démarrage
window.onload = loadTasks;


