import axiosInstance from "./authHandle";

const vendorLeadUrl = "/account/vendor-create";
const getVendorListUrl = "/account/vendor-list";
const getVendorStatusUrl = "/company/order-status-list";
const getVendorServiceUrl = "/main/category-list";
const getIndivitualVendorListUrl = "/account/vendor-list-details";
const getIndivitualVendorUrl = "/account/vendor-details";
const idTypeUrl = "/account/userid-type";
const createSiteVist = "company/site-visit-create/";
const getSiteVist = "company/site-visit-list/";
const getSiteVistQualifications = "/company/qualification-list";
const createPropsal = "company/proposal-create/";
const getPropsals = "company/proposal-list";
const createNegotation = "company/negotiation-create/";
const getNegotiations = "company/negotiation-list";
const createMOU = "company/mou-create/";
const getMOUs = "company/mou-list";
const goLives = "company/onboard-vendor/";
const updateVendorDetails = "account/vendor-add-details";
const miscellaneousListUrl = "company/miscellaneous-list";
const miscellaneousAddUrl = "company/miscellaneous-create/";
const miscellaneousTypeList = "company/miscellaneoustype-list";
const miscellaneousUpdateUrl = "company/miscellaneous-update";
const vendorLeadCountUrl = "account/vendor-leads-count";
const vendorStatusUrl = "company/change-status";
const siteVisitUpdateUrl = "company/site-visit-update";
const proposalUpdateUrl = "company/proposal-update";
const negotiationUpdateUrl = "company/negotiation-update";
const charterUpdateUrl = "company/mou-update";
const exportVendorList = "account/vendor-list-export/";
const salesCount = "/account/sales-rep-count";

const fileUploadApiTimeOut=20000

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
export const UpdateVendorListById = (id, data) => {
  return axiosInstance
    .put(`${updateVendorDetails}/${id}`, data, {
      headers: { "Content-Type": "application/json", Accept: "*/*" },
    })
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
    .post(
      createSiteVist,
      data,{
        timeout: fileUploadApiTimeOut || axiosInstance.defaults.timeout,
      }
      //   {
      //   headers: { "Content-Type": "application/json", Accept: "*/*" },
      // }
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
export const getSiteVisit = (companyID) => {
  return axiosInstance
    .get(getSiteVist, {
      params: {
        id: companyID,
      },
    })
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
    .post(
      createPropsal,
      data,{
        timeout: fileUploadApiTimeOut || axiosInstance.defaults.timeout,
      }
      //    {
      //   headers: { "Content-Type": "application/json", Accept: "*/*" },
      // }
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getPropsal = (companyID) => {
  return axiosInstance
    .get(getPropsals, { params: { id: companyID } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const submitNegotiation = (data) => {
  return axiosInstance
    .post(
      createNegotation,
      data,{
        timeout: fileUploadApiTimeOut || axiosInstance.defaults.timeout,
      }
      //    {
      //   headers: { "Content-Type": "application/json", Accept: "*/*" },
      // }
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getNegotiation = (companyID) => {
  return axiosInstance
    .get(getNegotiations, { params: { id: companyID } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const submitCharter = (data) => {
  return axiosInstance
    .post(
      createMOU,
      data,{
        timeout: fileUploadApiTimeOut || axiosInstance.defaults.timeout,
      }
      //   {
      //   headers: { "Content-Type": "application/json", Accept: "*/*" },
      // }
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getMOU = (companyID) => {
  return axiosInstance
    .get(getMOUs, { params: { id: companyID } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const goLive = (id) => {
  return axiosInstance
    .put(`${goLives}${id}`, { status: "True" })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getMiscellaneousList = (companyID) => {
  return axiosInstance
    .get(miscellaneousListUrl, { params: { id: companyID } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const addMiscellaneousAttachment = (data) => {
  return axiosInstance
    .post(miscellaneousAddUrl, data,{
      timeout: fileUploadApiTimeOut || axiosInstance.defaults.timeout,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const updateMiscellaneousAttachment = (id, data) => {
  return axiosInstance
    .put(`${miscellaneousUpdateUrl}/${id}`, data,{
      timeout: fileUploadApiTimeOut || axiosInstance.defaults.timeout,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getMiscellaneousTypeList = () => {
  return axiosInstance
    .get(miscellaneousTypeList)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getVendorLeadCount = () => {
  return axiosInstance
    .get(vendorLeadCountUrl)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const updateVendorStatus = (id, status) => {
  return axiosInstance
    .put(`${vendorStatusUrl}/${id}`, { new_status: status })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const updateSiteVisitAttachment = (id, data) => {
  return axiosInstance
    .put(`${siteVisitUpdateUrl}/${id}`, data,{
      timeout: fileUploadApiTimeOut || axiosInstance.defaults.timeout,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const updatProposalAttachment = (id, data) => {
  return axiosInstance
    .put(`${proposalUpdateUrl}/${id}`, data,{
      timeout: fileUploadApiTimeOut || axiosInstance.defaults.timeout,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const updateNegotiationAttachment = (id, data) => {
  return axiosInstance
    .put(`${negotiationUpdateUrl}/${id}`, data,{
      timeout: fileUploadApiTimeOut || axiosInstance.defaults.timeout,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const updateCharterAttachment = (id, data) => {
  return axiosInstance
    .put(`${charterUpdateUrl}/${id}`, data,{
      timeout: fileUploadApiTimeOut || axiosInstance.defaults.timeout,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const handleVendorExport = () => {
  return axiosInstance
    .get(exportVendorList)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getsalesTotalCount = () => {
  return axiosInstance
    .get(salesCount)
    .then((response) => response.data)
    .catch((error) => {
      console.error(
        "Error while fetching total count of customer request:",
        error
      );
      throw error;
    });
};
