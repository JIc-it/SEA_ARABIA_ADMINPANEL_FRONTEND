import axiosInstance from "./authHandle";

const vendorLeadUrl = "/account/vendor-create";
const getVendorListUrl = "/account/vendor-list";
const getVendorStatusUrl = "/company/orderstatus-list";
const getVendorServiceUrl='/main/category-list'

export const createVenderLead = (data) => {
  return axiosInstance
    .post(vendorLeadUrl, data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while creating reward product:", error);
      throw error;
    });
};

export const getVendorList = (search, status) => {
  return axiosInstance
    .get(getVendorListUrl, { params: { search: search, status: status } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getVendorStatus = () => {
  return axiosInstance
    .get(getVendorStatusUrl)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getVendorServiceTag = () => {
  return axiosInstance
    .get(getVendorServiceUrl)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
