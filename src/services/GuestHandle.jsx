import axiosInstance from "./authHandle";
const getIndivitualAdminListUrl = "/account/vendor-list-details";
const getGuestListData = "/account/guest-user/list";
const adminlistCreateUrl = "/account/user-create";
const updateDetails = "account/users-update";
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

export const createAdmin = async (data) => {
  try {
    const response = await axiosInstance.post(adminlistCreateUrl, data);
    return response.data;
  } catch (error) {
    console.error("Error while creating admin:", error);
    throw error;
  }
};

export const createSalesRep = (data) => {
  return axiosInstance
    .post(adminlistCreateUrl, data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while creating  salesrep:", error);
      throw error;
    });
};

export const UpdateAdminListById = (adminId, data) => {
  return axiosInstance
    .put(`${updateDetails}/${adminId}`, data, {
      headers: { "Content-Type": "application/json", Accept: "*/*" },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching admin request:", error);
      throw error;
    });
};
export const UpdateSalesRepListById = (salesRepId, data) => {
  return axiosInstance
    .put(`${updateDetails}/${salesRepId}`, data, {
      headers: { "Content-Type": "application/json", Accept: "*/*" },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching salesRep request:", error);
      throw error;
    });
};
