// Get elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Load saved tasks when page loads
loadTasks();

// Add task using button
addBtn.addEventListener('click', addTask);

// Add task using Enter key
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    createTask(taskText);
    saveTasks();
    taskInput.value = '';
}

function createTask(taskText, completed = false) {
    const li = document.createElement('li');

    if (completed) {
        li.classList.add('completed');
    }

    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="delete-btn">Delete</button>
    `;

    // Toggle completed state
    li.addEventListener('click', function (e) {
        if (e.target.tagName === 'BUTTON') return;
        li.classList.toggle('completed');
        saveTasks();
    });

    // Delete task
    li.querySelector('.delete-btn').addEventListener('click', function () {
        li.remove();
        saveTasks();
    });

    taskList.appendChild(li);
}

function saveTasks() {
    const tasks = [];

    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
            text: li.querySelector('.task-text').textContent,
            completed: li.classList.contains('completed')
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        createTask(task.text, task.completed);
    });
}
