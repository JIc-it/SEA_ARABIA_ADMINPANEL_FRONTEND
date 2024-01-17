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