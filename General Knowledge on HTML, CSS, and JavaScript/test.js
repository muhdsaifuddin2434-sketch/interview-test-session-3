// script.js
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
let tasks = [];
// Add Task
taskForm.addEventListener('submit', (e) => {
e.preventDefault();
const title = document.getElementById('taskTitle').value;
const description = document.getElementById('taskDesc').value;
const priority = document.getElementById('taskPriority').value;
const task = {
id: Date.now(),
title,
description,
priority,
completed: false
};
tasks.push(task);
renderTasks();
taskForm.reset();
});// Render Tasks
function renderTasks() {
taskList.innerHTML = '';
tasks.forEach(task => {
const li = document.createElement('li');
li.className = `task-item priority-${task.priority.toLowerCase()} ${task.completed ?
'completed' : ''}`;
li.innerHTML = `
<strong>${task.title}</strong> <br>
<span>${task.description}</span>
<div class="task-actions">
<button onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' :
'Done'}</button>
<button onclick="editTask(${task.id})">Edit</button>
<button onclick="deleteTask(${task.id})">Delete</button>
</div>
`;
taskList.appendChild(li);
});
}
// Toggle Completion
function toggleComplete(id) {
tasks = tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task);
renderTasks();
}// Delete Task
function deleteTask(id) {
tasks = tasks.filter(task => task.id !== id);
renderTasks();
}
// Edit Task
function editTask(id) {
const task = tasks.find(t => t.id === id);
document.getElementById('taskTitle').value = task.title;
document.getElementById('taskDesc').value = task.description;
document.getElementById('taskPriority').value = task.priority;
// Remove old task
tasks = tasks.filter(t => t.id !== id);
renderTasks();
}
