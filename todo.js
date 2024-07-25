let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('task_counter');

console.log('Working');

function addTaskToDom (task){
    const li = document.createElement('li');

    li.innerHTML = `
        <li>
          <input type="checkbox" id = "${tasks.id}"  ${tasks.done ? 'checked' : '' }class="custom-checkbox">
          <label for="${tasks.id}">${tasks.text}</label>
          <img src="bin.svg" class="delete" data-id="${tasks.id}" />
        </li>
        `;
        taskList.append(li);
}
function renderList(task) {
    taskList.innerHTML = '';

    for (let i = 0; i < tasks.length; i++){
        addTaskToDom(tasks[i]);
    }

    tasksCounter.innerHTML = tasks.length;
}

function toggleTask(taskId) {
    const task = tasks.filter(function(task){
        return task.id === taskId
    });

    if (task.length > 0){
        const currentTask = task[0];

        currentTask.done = !currentTask.done;
        renderList();
        showNotification('Task toggled successfully');
        return;
    }

    showNotification('Could not toggled the task');
}

function deleteTask(taskId) {
    const newTasks = tasks.filter(function (task){
        return task.id !== taskId;
    });

    tasks = newTasks;
    renderList();
    showNotification('Task deleted successfully');
}

function addTask(task) {
    if (task){
        tasks.push(task);
        renderList();
        showNotification('Task added successfuly');
        return;
    }
    showNotification('Task can not br added');
}

function showNotification(text) {
    alert(text);
}

function handleInputKeypress(e){
    if (e.key === 'Enter'){
       const text = e.target.value;
       console.log('text',text);
       
       if (!text){
        showNotification('Task text can not be empty');
        return;
       }
       const task = {
        text,
        id: Date.now().toString(),
        done: false
       }
       e.target.value = '';
       addTask(task);
    }
}

function handleClickListener(e){
    const target = e.target;
    
    if (target.className === 'delete'){
        const taskId =target.id;
        deleteTask(taskId);
    } else if (target.className === 'custom-checkbox') {
        const taskId = target.dataset.id;
        toggleTask(taskId);
    }
}

function intializeApp () {
    addTaskInput.addEventListener('keypress', handleInputKeypress);
    document.addEventListener('click', handleClickListener);
}

intializeApp ();