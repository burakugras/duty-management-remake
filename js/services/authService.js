import { API_BASE_URL } from "../environment";

const AUTH_API_BASE_URL = `${API_BASE_URL}/Auth`;

export const register = (userData) => {
  return $.ajax({
    url: `${AUTH_API_BASE_URL}/Register`,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(userData),
  });
};

export const login = (credentials) => {
  return $.ajax({
    url: `${AUTH_API_BASE_URL}/Login`,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(credentials),
  });
};
