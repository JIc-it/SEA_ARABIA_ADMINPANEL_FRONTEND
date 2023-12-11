import axiosInstance from "./authHandle";

export const getCustomerist = () => {
  return axiosInstance
    .get("account/user-list/")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};