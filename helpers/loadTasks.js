import { getTasksByUserId } from "../js/services/taskService.js";
import { addTaskToDOM } from "./taskItem.js";

export const loadTasks = (userId, containerId, pageIndex = 0, pageSize = 5) => {
  return getTasksByUserId(userId, { PageIndex: pageIndex, PageSize: pageSize })
    .then((response) => {
      const tasks = response.items;

      // console.log(response);

      $(`#${containerId}`).empty();

      tasks.forEach((task) => {
        addTaskToDOM(task, containerId);
      });

      if (response.index === 0) {
        $("#back-arrow").hide();
      } else {
        $("#back-arrow").show();
      }

      if (response.index === response.pages - 1) {
        $("#next-arrow").hide();
      } else {
        $("#next-arrow").show();
      }
    })
    .catch((err) => {
      console.error("Görevler yüklenirken bir sorun oluştu", err);
    });
};
