import axiosInstance from "./authHandle";

const vendorLeadUrl = "/account/vendor-create";
const getVendorListUrl = "/account/vendor-list";

export const createVenderLead = (data) => {
  return axiosInstance
    .post(vendorLeadUrl, data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while creating reward product:", error);
      throw error;
    });
};

export const getVendorList = () => {
  return axiosInstance
    .get(getVendorListUrl)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
