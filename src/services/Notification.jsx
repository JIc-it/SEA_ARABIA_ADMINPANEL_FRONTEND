import axiosInstance from "./authHandle";

export const getNotificationList = () => {
    return axiosInstance
      .get("account/notifications/")
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error while fetching lead request:", error);
        throw error;
      });
  };

export const clearNotifications = () => {
    return axiosInstance
      .get("account/notifications?mark_as_read=true")
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error while fetching lead request:", error);
        throw error;
      });
  };