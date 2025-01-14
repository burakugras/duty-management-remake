import { formatDate } from "./formatDate.js";

export function renderTodoItem(todo) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const leftDiv = document.createElement('div');
    leftDiv.classList.add('left-div');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.status === 'Completed';

    const span = document.createElement('span');
    span.textContent = todo.description;

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.classList.add('todo-editInput');
    editInput.hidden = true;

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);
    leftDiv.appendChild(editInput);

    const middleDiv = document.createElement('div');
    middleDiv.classList.add('middle-div');

    const progressStatus = document.createElement('div');
    progressStatus.classList.add('progress-status');

    const createDateSpan = document.createElement('span');
    createDateSpan.classList.add('create-date');
    createDateSpan.textContent = formatDate(todo.createdDate);

    middleDiv.appendChild(progressStatus);
    middleDiv.appendChild(createDateSpan);

    const rightDiv = document.createElement('div');
    rightDiv.classList.add('right-div');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('todo-deleteBtn');
    deleteBtn.textContent = 'Delete';

    const editBtn = document.createElement('button');
    deleteBtn.classList.add('todo-editBtn');
    editBtn.textContent = 'Edit';

    const saveBtn = document.createElement('button');
    saveBtn.classList.add('todo-saveBtn');
    saveBtn.textContent = 'Save';
    saveBtn.hidden = true;

    rightDiv.appendChild(deleteBtn);
    rightDiv.appendChild(editBtn);
    rightDiv.appendChild(saveBtn);

    todoDiv.appendChild(leftDiv);
    todoDiv.appendChild(middleDiv);
    todoDiv.appendChild(rightDiv);

    //Event Listeners

    editBtn.addEventListener('click', () => {
        checkbox.hidden = true;
        span.hidden = true;
        deleteBtn.hidden = true;
        editBtn.hidden = true;
        progressStatus.hidden = true;
        createDateSpan.hidden = true;
        editInput.hidden = false;
        editInput.value = todo.description;
        saveBtn.hidden = false;
    })

    saveBtn.addEventListener('click', () => {
        checkbox.hidden = false;
        span.hidden = false;
        progressStatus.hidden = false;
        createDateSpan.hidden = false;
        deleteBtn.hidden = false;
        editBtn.hidden = false;
        editInput.hidden = true;
        saveBtn.hidden = true;
        //will be continue
    })

    deleteBtn.addEventListener('click', () => {
        todoDiv.remove(); // UI remove
        //will be continue for remove from API

    })

    return todoDiv;
}