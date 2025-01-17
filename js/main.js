import { getStatusClass } from "../helpers/getStatusClass.js";
import { loadTasks } from "../helpers/loadTasks.js";
import { createTask } from "../helpers/taskItem.js";
import { login } from "./services/authService.js";
import { deleteTask, updateTask } from "./services/taskService.js";

$(document).ready(function () {
  const authToken = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  let currentPage = 0;
  const pageSize = 5;

  function loadTasksWithPagination(userId, containerId) {
    const verifiedUserId = userId || localStorage.getItem("userId");
    if (!verifiedUserId) {
      console.error("Kullanıcı ID'si eksik!");
      return;
    }
    loadTasks(verifiedUserId, containerId, currentPage, pageSize);
  }

  $("#next-arrow").on("click", () => {
    currentPage += 1;
    loadTasksWithPagination(userId, "task-container");
  });

  $("#back-arrow").on("click", () => {
    if (currentPage > 0) {
      currentPage -= 1;
      loadTasksWithPagination(userId, "task-container");
    }
  });

  if (authToken && userId) {
    $("#login-page").hide();
    $("#task-page").show();
    $("#task-container").show();
    $("#logout-button").show();
    $(".pagination-div").show();

    loadTasksWithPagination(userId, "task-container");
  } else {
    $("#login-page").show();
    $("#task-page").hide();
    $("#task-container").hide();
    $("#logout-button").hide();
    $(".pagination-div").hide();
  }

  $("#task-container").on("click", ".delete-button", (event) => {
    const taskDiv = $(event.currentTarget).closest(".task-div");
    const taskId = taskDiv.data("id");
    if (confirm("Bu görevi silmek istediğinize emin misiniz?")) {
      deleteTask(taskId)
        .then(() => {
          taskDiv.remove();
        })
        .catch((err) => {
          console.error("Görev silinirken bir hata oluştu.", err);
        });
    }
  });

  let editingTaskId = null;
  $("#task-container").on("click", ".edit-button", (event) => {
    const taskDiv = $(event.currentTarget).closest(".task-div");
    const taskId = taskDiv.data("id");
    const title = taskDiv.find(".title-span").text().trim();
    const description = taskDiv.find(".description-label").text().trim();
    const statusClass = taskDiv
      .find(".status-icon")
      .attr("class")
      .split(" ")
      .pop();

    let status = 1;
    if (statusClass === "status-in-progress") status = 2;
    else if (statusClass === "status-completed") status = 3;

    taskDiv.css("opacity", "0.5");
    $(event.currentTarget).closest(".button-items").css("visibility", "hidden");

    $("#task-title").val(title);
    $("#task-desc").val(description);
    $("#task-status").val(status);

    editingTaskId = taskId;
  });

  $("#task-container").on("click", ".description-label", (event) => {
    const taskDiv = $(event.currentTarget).closest(".task-div");
    const taskId = taskDiv.data("id");
    const title = taskDiv.find(".title-span").text().trim();
    const description = $(event.currentTarget).text().trim();
    const userId = localStorage.getItem("userId");

    const isCompleted = taskDiv
      .find(".status-icon")
      .hasClass("status-completed");

    const newStatus = isCompleted ? 1 : 3;
    const newDecoration = isCompleted ? "none" : "line-through";
    const newStatusClass = isCompleted ? "status-new" : "status-completed";

    $(event.currentTarget).css({
      "text-decoration": newDecoration,
    });

    const taskData = {
      id: taskId,
      title: title,
      description: description,
      status: newStatus,
      userId: parseInt(userId, 10),
    };

    updateTask(taskData)
      .then(() => {
        console.log("Görev başarıyla güncellendi.");
        taskDiv
          .find(".status-icon")
          .attr("class", `status-icon ${newStatusClass}`);
      })
      .catch((err) => {
        console.error("Görev güncellenirken bir hata oluştu.", err);
      });
  });

  $("#task-form").on("submit", (event) => {
    event.preventDefault();

    const title = $("#task-title").val().trim();
    const description = $("#task-desc").val().trim();
    const statusInput = $("#task-status").val();
    const userId = localStorage.getItem("userId");

    console.log(statusInput);

    if (!title || !description) {
      console.log("Title veya Description alanı boş bırakılamaz.");
      return;
    }

    console.log(
      "if içerisinde editingTaskId değerini kontrol etmeden hemen önce",
      editingTaskId
    );

    if (editingTaskId) {
      const taskData = {
        id: editingTaskId,
        title: title,
        description: description,
        status: statusInput,
        userId: parseInt(userId, 10),
      };

      console.log("userId during update : ", taskData);

      updateTask(taskData)
        .then((updatedTask) => {
          const taskDiv = $(`#task-container [data-id="${updatedTask.id}"]`);
          taskDiv.find(".title-span").text(updatedTask.title);
          taskDiv.find(".description-label").text(updatedTask.description);

          const statusClass = getStatusClass(updatedTask.status); // ?
          taskDiv
            .find(".status-icon")
            .attr("class", `status-icon ${statusClass}`);

          taskDiv.css("opacity", "1");
          taskDiv.find(".button-items").css("visibility", "visible");

          $("#task-form")[0].reset();
          console.log(
            "if içerisinde editingTaskId değerini kontrol etmeden hemen önce son : ",
            editingTaskId
          );
          editingTaskId = null;
          console.log(
            "if içerisinde editingTaskId değerini kontrol etmeden hemen sonra",
            editingTaskId
          );

          console.log("Görev güncellendi.");
        })
        .catch((err) => {
          console.error("Görev güncellenirken bir hata oluştu.", err);
        });
    } else {
      const taskData = {
        title: title,
        description: description,
        status: 1,
        userId: localStorage.getItem("userId"),
      };

      createTask(taskData, "task-container")
        .then(() => {
          $("#task-form")[0].reset();
        })
        .catch((err) => {
          console.error("Görev eklenirken bir sorun oluştu.", err);
        });
    }
  });

  $("#login-form").on("submit", (event) => {
    event.preventDefault();

    const email = $("#input-email").val();
    const password = $("#input-password").val();

    login({ email, password })
      .then((response) => {
        if (!response.userId) {
          console.error("Login yanıtında userId bulunamadı!");
          return;
        }
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("userId", response.userId);

        $("#login-page").hide();
        $("#task-page").show();
        $("#task-container").show();
        $(".pagination-div").show();
        $("#logout-button").show();

        console.log("Login sonrası userId:", response.userId);
        loadTasksWithPagination(response.userId, "task-container");
      })
      .catch((err) => {
        console.error("Giriş yaparken bir hata oluştu", err);
      });
  });

  $("#logout-button").on("click", function () {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    window.location.href = "";
  });
});
