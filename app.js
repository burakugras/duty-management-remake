import { getTodosByUserId } from "./api/todoService.js";
import { renderTodoList } from "./components/todoList.js";

async function init() {
    const userId = 1;
    const todos = await getTodosByUserId(userId);

    const container = document.querySelector('.duty-container');
    renderTodoList(container, todos);
}

document.addEventListener("DOMContentLoaded", init);