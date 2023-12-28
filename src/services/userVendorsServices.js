import axiosInstance from "./authHandle";

const vendorUserCardUrl='account/vendor-count-admin'
const getIndivitualVendorListUrl='account/vendor-details'

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