
export function renderTodoDiv(todo) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const leftDiv = document.createElement('div');
    leftDiv.classList.add('left-div');

    const rightDiv = document.createElement('div');
    rightDiv.classList.add('right-div');

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


}