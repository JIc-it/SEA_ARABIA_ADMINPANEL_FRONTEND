import axiosInstance from "./authHandle";
const getIndivitualVendorListUrl = "/account/vendor-list-details";

export const getCustomerlist = () => {
  return axiosInstance
    .get("account/user-list")
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
