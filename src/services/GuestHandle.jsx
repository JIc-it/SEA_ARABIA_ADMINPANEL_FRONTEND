import axiosInstance from "./authHandle";
const getIndivitualAdminListUrl = "/account/vendor-list-details";
const getGuestListData = "/account/guest-user/list";

export const getGuestUserList = () => {
  return axiosInstance
    .get(getGuestListData)
    .then((response) => {
    //   console.log("Guest user list response", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error while fetching  guest list:", error);
      throw error;
    });
};


export const getAdminListById = (adminId) => {
  return axiosInstance
    .get(`${getIndivitualAdminListUrl}/${adminId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching :", error);
      throw error;
    });
};

export const getSalesRepListById = (salesRepId) => {
  return axiosInstance
    .get(`${getIndivitualAdminListUrl}/${salesRepId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching salesRepId :", error);
      throw error;
    });
};