var taskInput = document.getElementById("newTask");
var addTaskBtn = document.getElementById("add");
var updateTaskBtn = document.getElementById("update");
var updatedIndex;
var taskContainer = [];

// Check if tasks exist in localStorage and retrieve them
if (localStorage.getItem("userTask") !== null) {
    taskContainer = JSON.parse(localStorage.getItem("userTask"));
    displayTask();
}

// Add a new task
function addTask() {
    var taskInfo = taskInput.value;
    if (taskInfo) {
        // Add task as an object with text and completion status
        taskContainer.push({ text: taskInfo, completed: false });
        localStorage.setItem("userTask", JSON.stringify(taskContainer));
        displayTask();
        taskInput.value = "";
    } else {
        Swal.fire("Error", "Enter the task!", "error");
    }
}

// Display tasks in the table
function displayTask() {
    var taskBox = "";
    if (taskContainer.length == 0) {
        document.getElementById("allTasks").innerHTML = `
        <tr>
            <td colspan="5-" class="fw-bold">Task List is Empty!</td>
        </tr>`;
    } else {
        for (var i = 0; i < taskContainer.length; i++) {
            let isCompleted = taskContainer[i].completed ? "completed" : "";
            let buttonText = taskContainer[i].completed ? "✅ Completed" : "🔄 Not Completed";

            taskBox += `
                <tr class="fw-normal ${isCompleted}">
                    <td>${i + 1}</td>
                    <td>
                        <span class="${isCompleted}">${taskContainer[i].text}</span>
                    </td>
                    <td>
                        <button class="btn btn-success btn-sm" onclick="toggleTaskComplete(${i})">${buttonText}</button>
                    </td>
                    <td>
                        <a style="cursor: pointer;" class="update" onclick="getTaskToUpdate(${i})">
                            <i class="fas fa-pen-to-square fa-lg text-warning me-3"></i>
                        </a>
                    </td>
                    <td>
                        <a style="cursor: pointer;" class="delete" onclick="deleteTask(${i})">
                            <i class="fas fa-trash-alt fa-lg text-danger"></i>
                        </a>
                    </td>
                </tr>`;
        }
        document.getElementById("allTasks").innerHTML = taskBox;
    }
}

// Delete a task
function deleteTask(index) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your task has been deleted",
                showConfirmButton: false,
                timer: 1500
            });
            taskContainer.splice(index, 1);
            localStorage.setItem("userTask", JSON.stringify(taskContainer));
            displayTask();
        }
    });
}

// Get a task for updating
function getTaskToUpdate(i) {
    addTaskBtn.classList.add("d-none");
    updateTaskBtn.classList.remove("d-none");
    taskInput.value = taskContainer[i].text;
    updatedIndex = i;
}

// Update an existing task
function updateTask() {
    addTaskBtn.classList.remove("d-none");
    updateTaskBtn.classList.add("d-none");

    // Update only the task text without changing its completion status
    taskContainer[updatedIndex].text = taskInput.value;
    localStorage.setItem("userTask", JSON.stringify(taskContainer));
    taskInput.value = "";
    displayTask();
}

// Toggle task completion status
function toggleTaskComplete(index) {
    taskContainer[index].completed = !taskContainer[index].completed;
    localStorage.setItem("userTask", JSON.stringify(taskContainer));
    displayTask();
}
