import { loadTasks } from "../helpers/loadTasks";
import { createTask } from "../helpers/taskItem";
import { login } from "./services/authService";
import { deleteTask } from "./services/taskService";

$(document).ready(function () {
  const authToken = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  if (authToken && userId) {
    $("#login-page").hide();
    $("#task-page").show();
    $("#task-container").show();

    loadTasks(userId, "task-container");
  } else {
    $("#login-page").show();
    $("#task-page").hide();
    $("#task-container").hide();
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

  $("#task-container").on("click", ".edit-button", (event) => {
    $(event.currentTarget).closest(".task-div").css("opacity", "0.5");
    
  });

  $("#task-page").on("submit", "#save-button", (event) => {
    event.preventDefault();
    const title = $("#task-title").val().trim();
    const description = $("#task-desc").val().trim();

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
  });

  $("#login-form").on("submit", (event) => {
    event.preventDefault();

    const email = $("#input-email").val();
    const password = $("#input-password").val();

    login({ email, password })
      .then((response) => {
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("userId", response.userId);

        $("#login-page").hide();
        $("#task-page").show();
        $("#task-container").show();

        loadTasks(response.userId, "task-container");
      })
      .catch((err) => {
        console.error("Giriş yaparken bir hata oluştu", err);
      });
  });
});
