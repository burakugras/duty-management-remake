import { DutyStatus } from "../constants/constants.js";

export const getStatusClass = (status) => {
  switch (status) {
    case DutyStatus.New:
      return "status-new";
    case DutyStatus.InProgress:
      return "status-in-progress";
    case DutyStatus.Completed:
      return "status-completed";
    default:
      return "";
  }
};
