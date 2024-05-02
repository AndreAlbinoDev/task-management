
const todoTasks = document.getElementById("todo-tasks");
const inProgressTasks = document.getElementById("in-progress-tasks");
const doneTasks = document.getElementById("done-tasks");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const taskTitleInput = document.getElementById("task-title");
const taskAssigneeInput = document.getElementById("task-assignee");
const saveTaskBtn = document.getElementById("save-task-btn");
const closeBtn = document.getElementsByClassName("close")[0];


let tasks = [];

window.onclick = event => {
    if (event.target == modal) {
        closeModal();
    }
}

closeBtn.onclick = () => {
    closeModal();
}

saveTaskBtn.onclick = () => {
    const title = taskTitleInput.value.trim();
    const assignee = taskAssigneeInput.value.trim();
    if (title && assignee) {
        const task = createTask(title, assignee);
        addTaskToTaskList(task);
        closeModal();
    } else {
        alert("Please fill in all fields.");
    }
}

function createTask(title, assignee) {
    return {
        id: Date.now(),
        title,
        assignee,
        status: "todo"
    };
}

function addTaskToTaskList(task) {
    tasks.push(task);
    const taskItem = createTaskElement(task);
    if (task.status === "todo") {
        todoTasks.appendChild(taskItem);
    } else if (task.status === "in-progress") {
        inProgressTasks.appendChild(taskItem);
    } else if (task.status === "done") {
        doneTasks.appendChild(taskItem);
    }
}

function createTaskElement(task) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task");
    taskItem.dataset.id = task.id;
    taskItem.dataset.status = task.status;
    taskItem.innerHTML = `
        <h3>${task.title}</h3>
        <p>Assigned to: ${task.assignee}</p>
        <button onclick="editTask(${task.id})">Edit</button>
        ${getTaskButton(task)}
    `;
    return taskItem;
}

function getTaskButton(task) {
    if (task.status === "todo") {
        return `<button onclick="moveTask(${task.id}, 'in-progress')">Start</button>`;
    } else if (task.status === "in-progress") {
        return `<button onclick="moveTask(${task.id}, 'done')">Finish</button>`;
    } else {
        return "";
    }
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);
    taskTitleInput.value = task.title;
    taskAssigneeInput.value = task.assignee;
    modalTitle.innerText = "Edit Task";
    saveTaskBtn.innerText = "Update";
    saveTaskBtn.onclick = () => {
        const newTitle = taskTitleInput.value.trim();
        const newAssignee = taskAssigneeInput.value.trim();
        if (newTitle && newAssignee) {
            task.title = newTitle;
            task.assignee = newAssignee;
            updateTaskElement(task);
            closeModal();
        } else {
            alert("Please fill in all fields.");
        }
    };
    modal.style.display = "block";
}

function updateTaskElement(task) {
    const taskItem = document.querySelector(`.task[data-id="${task.id}"]`);
    taskItem.innerHTML = `
        <h3>${task.title}</h3>
        <p>Assigned to: ${task.assignee}</p>
        <button onclick="editTask(${task.id})">Edit</button>
        ${getTaskButton(task)}
    `;
    taskItem.dataset.status = task.status;
}

function moveTask(id, status) {
    const task = tasks.find(task => task.id === id);
    task.status = status;
    updateTaskElement(task);
    const targetList = document.getElementById(`${status}-tasks`);
    targetList.appendChild(document.querySelector(`.task[data-id="${id}"]`));
}

function closeModal() {
    modal.style.display = "none";
}

initializeProject();

function initializeProject() {
    const mockTasks = [
        { id: 1, title: "Task 1", assignee: "", status: "todo" },

    ];

    mockTasks.forEach(task => {
        addTaskToTaskList(task);
    });
}
