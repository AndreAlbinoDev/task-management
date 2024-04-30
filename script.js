// Obtendo elementos do DOM
const todoTasks = document.getElementById("todo-tasks");
const inProgressTasks = document.getElementById("in-progress-tasks");
const doneTasks = document.getElementById("done-tasks");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const taskTitleInput = document.getElementById("task-title");
const taskAssigneeInput = document.getElementById("task-assignee");
const saveTaskBtn = document.getElementById("save-task-btn");
const closeBtn = document.getElementsByClassName("close")[0];

// Dados falsos de tarefas
let tasks = [];

// Listeners de eventos do modal
window.onclick = event => {
    if (event.target == modal) {
        closeModal();
    }
}

closeBtn.onclick = () => {
    closeModal();
}

// Listener de evento para salvar tarefa
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

// Função para criar objeto de tarefa
function createTask(title, assignee) {
    return {
        id: Date.now(),
        title,
        assignee,
        status: "todo"
    };
}

// Função para adicionar tarefa à lista de tarefas
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

// Função para criar elemento de tarefa
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

// Função para obter botão de tarefa com base no status
function getTaskButton(task) {
    if (task.status === "todo") {
        return `<button onclick="moveTask(${task.id}, 'in-progress')">Start</button>`;
    } else if (task.status === "in-progress") {
        return `<button onclick="moveTask(${task.id}, 'done')">Finish</button>`;
    } else {
        return "";
    }
}

// Função para editar tarefa
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

// Função para atualizar elemento de tarefa
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

// Função para mover tarefa para lista diferente
function moveTask(id, status) {
    const task = tasks.find(task => task.id === id);
    task.status = status;
    updateTaskElement(task);
    const targetList = document.getElementById(`${status}-tasks`);
    targetList.appendChild(document.querySelector(`.task[data-id="${id}"]`));
}

// Função para fechar modal
function closeModal() {
    modal.style.display = "none";
}

// Inicializar o projeto
initializeProject();

function initializeProject() {
    // Simular tarefas
    const mockTasks = [
        { id: 1, title: "Task 1", assignee: "John Doe", status: "todo" },
        { id: 2, title: "Task 2", assignee: "Jane Smith", status: "in-progress" },
        { id: 3, title: "Task 3", assignee: "Alice Johnson", status: "done" }
    ];

    // Adicionar tarefas simuladas à lista de tarefas e exibir na página
    mockTasks.forEach(task => {
        addTaskToTaskList(task);
    });
}
