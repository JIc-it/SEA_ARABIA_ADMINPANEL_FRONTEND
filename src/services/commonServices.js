import axiosInstance from "./authHandle";

export const getListDataInPagination = (url) => {
  return axiosInstance
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
