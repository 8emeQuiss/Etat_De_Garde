// Function to load tasks
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear the list

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        var Category = ["Sélectionner la category exact", "A", "B", "C"];
        var selectPost = document.createElement("select");
        selectPost.className = "form-select w-25";

        // Set the task text
        li.textContent = task.taskText;

        // Create and append the options
        for (var i = 0; i < Category.length; i++) {
            var option = document.createElement("option");
            option.value = Category[i];
            option.text = Category[i];
            selectPost.appendChild(option);
        }

        // Set the selected category
        selectPost.value = task.category;

        // Update the category when the user changes the selection
        selectPost.onchange = () => {
            let selectedValue = selectPost.value; // Get the selected value
            updateCategory(index, selectedValue); // Update the category in localStorage
        };

        li.appendChild(selectPost);

        // Create and append the delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.className = 'btn-close';
        deleteBtn.onclick = () => deleteTask(index);

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Function to add a new task
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    let taskCategory = document.getElementById("taskCategory");
    let category = taskCategory.value;

    if (taskText !== "" && category !== "Sélectionner la category exact") {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ taskText, category }); // Add task with its category
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = ""; // Clear the input
        taskCategory.value = "Sélectionner la category exact"; // Reset the category dropdown
        loadTasks(); // Update the display
    } else {
        alert("Please enter a task and select a valid category.");
    }
}

// Function to update the category of a task
function updateCategory(index, category) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (tasks[index]) {
        tasks[index].category = category; // Update the category
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

// Function to delete a task
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1); // Remove the task at the specified index
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks(); // Reload the task list
}

// Function to clear all tasks
function clearTasks() {
    localStorage.removeItem("tasks");
    loadTasks();
}

// Load tasks when the page loads
window.onload = loadTasks;