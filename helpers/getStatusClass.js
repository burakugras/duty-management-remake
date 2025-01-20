import { DutyStatus } from "../constants/constants.js";

export const getStatusClass = (status) => {
  switch (status) {
    case "New":
      return "status-new";
    case "InProgress":
      return "status-in-progress";
    case "Completed":
      return "status-completed";
    default:
      return "status-new";
  }
};
