import { getTasksByUserId } from "../js/services/taskService.js";
import { addTaskToDOM } from "./taskItem.js";

export const loadTasks = (userId, containerId) => {
  return getTasksByUserId(userId)
    .then((tasks) => {
      tasks.forEach((task) => {
        addTaskToDOM(task, containerId);
      });
    })
    .catch((err) => {
      console.error("Görevler yüklenirken bir sorun oluştu", err);
    });
};
