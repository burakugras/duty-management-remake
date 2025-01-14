import { renderTodoItem } from "../js/todoItem.js";

export function renderTodoList(container, todos) {
    container.innerHTML = "";

    todos.forEach((todo) => {
        const todoElement = renderTodoItem(todo);
        container.appendChild(todoElement);
    })
}