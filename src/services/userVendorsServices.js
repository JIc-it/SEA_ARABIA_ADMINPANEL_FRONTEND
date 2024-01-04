import axiosInstance from "./authHandle";

const vendorUserCardUrl = "account/vendor-count-admin";
const getIndivitualVendorListUrl = "account/vendor-details";
const updateStatus = "company/company-active-update";
const activityUrl = "report/log-list";

export const getUserVendorCard = () => {
  return axiosInstance
    .get(vendorUserCardUrl)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getIndivitualUserVendorListById = (vendorId) => {
  return axiosInstance
    .get(`${getIndivitualVendorListUrl}/${vendorId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
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
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getUserVendorActivityLog = (id) => {
  return axiosInstance
    .get(`${activityUrl}/${id}/`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
