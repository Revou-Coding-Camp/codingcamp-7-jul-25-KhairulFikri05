// Global List
let tasks = [];

// Function to add a task
function addTask() {
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date');

     // Validate inputs
    if (taskInput.value === '' || dueDateInput.value === '') {
        alert('Please fill in both task and due date.');
    } else {
        // Create a new task object
        const newTask = {
            id: Date.now(), // Unique ID based on current timestamp
            task: taskInput.value,
            dueDate: dueDateInput.value,
            completed: false
        };

        // Add the new task to the tasks array
        tasks.push(newTask);

        // Clear the input fields
        taskInput.value = '';
        dueDateInput.value = '';

        // Log the new task (for demonstration purposes)
        displayTasks();
    }
}

function displayTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Kosongkan tampilan

    tasks.forEach(task => {
        taskList.innerHTML += generateTaskItem(task, 'all');
    });
}

// Function to delete a specific task
function deleteTask(id) {
    // Find the index of the task to delete
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        // Remove the task from the tasks array
        tasks.splice(taskIndex, 1);
        displayTasks(); // Refresh the displayed task list
    }
}

// Function to delete all task
function deleteAllTasks() {
    tasks = []; // Clear the tasks array
    displayTasks(); // Refresh the displayed task list
}

// Menampilkan tugas yang selesai
function showCompleteTasks() {
    const completedTasks = tasks.filter(task => task.completed);
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    completedTasks.forEach(task => {
        taskList.innerHTML += generateTaskItem(task, 'completed');
    });
}

// Menampilkan hanya task yang belum selesai
function showIncompleteTasks() {
    const incompleteTasks = tasks.filter(task => !task.completed);
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    incompleteTasks.forEach(task => {
        taskList.innerHTML += generateTaskItem(task, 'incomplete');
    });
}

// Menandai task selesai atau belum
function toggleTaskCompletion(id, refreshType = 'all') {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;

        if (refreshType === 'completed') {
            showCompleteTasks();
        } else if (refreshType === 'incomplete') {
            showIncompleteTasks();
        } else {
            displayTasks();
        }
    }
}


function generateTaskItem(task, refreshType = 'all') {
    return `
    <div class="flex justify-between items-center p-[8px] border-b">
        <!-- Bagian kiri: teks task dan tanggal -->
        <div class="flex flex-col font-semibold">
            <span class="text-left text-lg ${task.completed ? 'line-through text-gray-500' : ''}">${task.task}</span>
            <span class="text-left text-sm text-red-500">${task.dueDate}</span>
        </div>

        <!-- Bagian kanan: tombol aksi -->
        <div class="flex gap-2">
            <button class="bg-green-500 text-white p-[8px] border rounded" onclick="toggleTaskCompletion(${task.id}, '${refreshType}')">
                ${task.completed ? 'Undo' : 'Complete'}
            </button>
            <button class="bg-red-500 text-white p-[8px] border rounded" onclick="deleteTask(${task.id})">Delete</button>
        </div>
    </div>`;
}
