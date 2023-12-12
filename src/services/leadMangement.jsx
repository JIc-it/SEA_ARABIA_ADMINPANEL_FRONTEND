import axiosInstance from "./authHandle";

const vendorLeadUrl = "/account/vendor-create";
const getVendorListUrl = "/account/vendor-list";
const getVendorStatusUrl = "/company/orderstatus-list";
const getVendorServiceUrl = "/main/category-list";
const getIndivitualVendorListUrl = "/account/vendor-list-details";
const getIndivitualVendorUrl = "/account/vendor-details";
const idTypeUrl = "/account/userid-type";
const createSiteVist="company/sitevisit-create/"
const getSiteVist="company/sitevisit-list"
const getSiteVistQualifications="/company/qualification-list"
const createPropsal="company/proposal-create/"
const getPropsals="company/proposal-list"
const createNegotation="company/negotation-create/"
const getNegotiations="company/negotation-list"
const createMOU="company/mou-create/"
const getMOUs="company/mou-list"
const goLives="company/onboard-vendor/"
const updateVendorDetails="account/vendor-add-details"


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

export const getVendorListById = (id) => {
  return axiosInstance
    .get(`${getIndivitualVendorListUrl}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
export const UpdateVendorListById = (id,data) => {
  return axiosInstance
    .put(`${updateVendorDetails}/${id}`,data)
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
export const submitSiteVisit = (data) => {
  return axiosInstance
    .post(createSiteVist,data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
export const getSiteVisit = () => {
  return axiosInstance
    .get(getSiteVist)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const siteVisitQualification = () => {
  return axiosInstance
    .get(getSiteVistQualifications)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
export const submitProposal = (data) => {
  return axiosInstance
    .post(createPropsal,data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getPropsal = () => {
  return axiosInstance
    .get(getPropsals)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const submitNegotiation = (data) => {
  return axiosInstance
    .post(createNegotation,data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getNegotiation = () => {
  return axiosInstance
    .get(getNegotiations)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const submitCharter = (data) => {
  return axiosInstance
    .post(createMOU,data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getMOU = () => {
  return axiosInstance
    .get(getMOUs)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const goLive = (id) => {
  return axiosInstance
    .put(`${goLives}${id}`,{status:"True"})
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
