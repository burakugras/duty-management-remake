import { getTasksByUserId } from "../js/services/taskService";
import { addTaskToDOM } from "./taskItem";

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
