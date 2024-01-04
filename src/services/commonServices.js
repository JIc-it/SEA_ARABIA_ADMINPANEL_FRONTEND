import axiosInstance from "./authHandle";

const resetpasswordURl="account/user-reset-password/"

export const getListDataInPagination = (url) => {
  return axiosInstance
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const handleChangePassword = (data) => {
  return axiosInstance
    .post(resetpasswordURl,data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
