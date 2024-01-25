import axiosInstance from "./authHandle";

const vendorUserCardUrl = "account/vendor-count-admin";
const getIndivitualVendorListUrl = "account/vendor-details";
const updateStatus = "company/company-active-update";
const activityUrl = "report/log-list";
const getPermissionUrl = "account/custom-permission/retrieve";
const updatePermissionUrl = "account/custom-permission";

export const getUserVendorCard = () => {
  return axiosInstance
    .get(vendorUserCardUrl)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching user request:", error);
      throw error;
    });
};

export const getIndivitualUserVendorListById = (vendorId) => {
  return axiosInstance
    .get(`${getIndivitualVendorListUrl}/${vendorId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching user request:", error);
      throw error;
    });
};

export const getUserVendorStatusUpdate = (id, status) => {
  return axiosInstance
    .patch(`${updateStatus}/${id}`, {
      status: status,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching user request:", error);
      throw error;
    });
};

export const getUserVendorActivityLog = (id) => {
  return axiosInstance
    .get(`${activityUrl}/${id}/`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching user request:", error);
      throw error;
    });
};

export const getUserPermissionData = (userId) => {
  return axiosInstance
    .get(`${getPermissionUrl}/${userId}/`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching user request:", error);
      throw error;
    });
};

export const updateUserPermissionData = (userId, permission) => {
  return axiosInstance
    .patch(
      `${updatePermissionUrl}/${userId}/`,
      { permission: permission },
      {
        headers: { "Content-Type": "application/json", Accept: "*/*" },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching user request:", error);
      throw error;
    });
};
