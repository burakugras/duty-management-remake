import { getStatusClass } from "./getStatusClass";
import { addTask } from "../js/services/taskService";

export const addTaskToDOM = (task, containerId) => {
  const statusClass = getStatusClass(task.status);
  const taskHTML = `
        <div class="task-div" data-id="${task.id}>
            <div class="span-items">
                <span class="title-span">${task.title}</span>
                <span class="description-label">${task.description}</span>
            </div>
            <div class="status-item">
                <div class="status-icon ${statusClass}"></div>
            </div>
            <div class="button-items">
                <button class="edit-button"></button>
                <button class="delete-button"></button>
                <button class="save-button"></button>
            </div>
        </div>
    `;
  $(`#${containerId}`).append(taskHTML);
};

export const createTask = (taskData, containerId) => {
  return addTask(taskData)
    .then((response) => {
      console.log("Task veri tabanına kaydedildi.", response); //burası değişecek.
      addTaskToDOM(taskData, containerId);
    })
    .catch((err) => {
      console.error("Task oluşturulurken bir hata meydana geldi.", err); // burası da değişecek.
    });
};
