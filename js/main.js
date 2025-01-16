import { loadTasks } from "../helpers/loadTasks";
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

  $("#task-container").on("click", ".delete-button", () => {
    const taskDiv = $(this).closest(".task-div");
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
