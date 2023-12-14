import axiosInstance from "./authHandle";
const getIndivitualVendorListUrl = "/account/vendor-list-details";
const updateVendorDetails = "account/vendor-add-details";
const updateCustomerDetails = "account/users-update";
const customerCount = "account/user-count-admin";

export const getCustomerlist = () => {
  return axiosInstance
    .get("account/user-list")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getCustomerSearch = (search, status) => {
  return axiosInstance
    .get("account/user-list", { params: { search: search, status: status } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
export const getCustomerListById = (customerId) => {
  return axiosInstance
    .get(`${getIndivitualVendorListUrl}/${customerId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const UpdateVendorListById = (vendorId, data) => {
  return axiosInstance
    .put(`${updateVendorDetails}/${vendorId}`, data, {
      headers: { "Content-Type": "application/json", Accept: "*/*" },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const UpdateCustomerListById = (customerId, data) => {
  return axiosInstance
    .put(`${updateCustomerDetails}/${customerId}`, data, {
      headers: { "Content-Type": "application/json", Accept: "*/*" },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getCustomerTotalCount = () => {
  return axiosInstance
    .get(customerCount)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
