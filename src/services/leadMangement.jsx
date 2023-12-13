import axiosInstance from "./authHandle";

const vendorLeadUrl = "/account/vendor-create";
const getVendorListUrl = "/account/vendor-list";
const getVendorStatusUrl = "/company/orderstatus-list";
const getVendorServiceUrl = "/main/category-list";
const getIndivitualVendorListUrl = "/account/vendor-list-details";
const getIndivitualVendorUrl = "/account/vendor-details";
const idTypeUrl = "/account/userid-type";

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

export const getVendorListById = (vendorId) => {
  return axiosInstance
    .get(`${getIndivitualVendorListUrl}/${vendorId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getIndivitualVendorDetail = (id) => {
  return axiosInstance
    .get(`${getIndivitualVendorUrl}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getUserIdType = () => {
  return axiosInstance
    .get(`${idTypeUrl}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

//new

export const getVendorlistData = () => {
  return axiosInstance
    .get("account/user-list/")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
