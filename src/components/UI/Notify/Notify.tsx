import { NotificationManager } from "react-notifications";

export const Notify = (type: number, message: string) => {
  switch (type) {
    case 200:
      return NotificationManager.success(message, "Success", 3000);
    case 400:
      return NotificationManager.warning(message, "Warning", 3000);
    default:
      return NotificationManager.error(message, "Error", 3000);
  }
};
