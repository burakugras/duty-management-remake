import { DEFAULT_PAGE_OPTIONS } from "../../constants/pageOptions.js";
import { API_BASE_URL } from "../environment.js";

const TASKS_API_BASE_URL = `${API_BASE_URL}/Duties`;

export const fetchTaks = (options = DEFAULT_PAGE_OPTIONS) => {
  return $.ajax({
    url: `${TASKS_API_BASE_URL}/GetAll`,
    method: "GET",
    dataType: "json",
    data: {
      ...options,
    },
  });
};

export const addTask = (taskData) => {
  return $.ajax({
    url: `${TASKS_API_BASE_URL}/Add`,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(taskData),
  });
};

export const deleteTask = (taskId) => {
  return $.ajax({
    url: `${TASKS_API_BASE_URL}/Delete/${taskId}`,
    method: "DELETE",
  });
};

export const updateTask = (taskData) => {
  return $.ajax({
    url: `${TASKS_API_BASE_URL}/Update`,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(taskData),
  });
};

export const getTaskById = (taskId) => {
  return $.ajax({
    url: `${TASKS_API_BASE_URL}/GetById/${taskId}`,
    method: "GET",
    dataType: "json",
  });
};

export const getTasksByUserId = (userId, options = DEFAULT_PAGE_OPTIONS) => {
  return $.ajax({
    url: `${TASKS_API_BASE_URL}/GetByUserId`,
    method: "GET",
    dataType: "json",
    data: {
      UserId: userId,
      ...options,
    },
  });
};
