import axiosInstance from "./authHandle";

const getOfferLists="offer/offers/admin";
const getOfferViews="offer/offers";
const getOfferCounts="offer/offer-count/";
const UpdateOffers="offer/offers";
const companylisting="company/companycms-list"
const serviceOnelisting="service/service-filter-list-cms"
const getcompanylist="offer/offer-service-info"
const exportdataURL="offer/export-offer-list/"


export const getCompanyListing = () => {
    return axiosInstance
      .get(companylisting,{params:{is_onboard:true}})
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error while fetching lead request:", error);
        throw error;
      });
  };
export const getOfferCount = () => {
    return axiosInstance
      .get(getOfferCounts)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error while fetching lead request:", error);
        throw error;
      });
  };

export const getOneServiceListing = (id) => {
    return axiosInstance
      .get(serviceOnelisting,{params:{company:id}})
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error while fetching lead request:", error);
        throw error;
      });
  };
export const getOneCompanyList = (id) => {
    return axiosInstance
      .get(`${getcompanylist}/${id}/`)
      .then((response) => (response.data))
      .catch((error) => {
        console.error("Error while fetching lead request:", error);
        throw error;
      });
  };
export const getDiscountOfferList = (search,data) => {
    return axiosInstance
      .get(getOfferLists,{params:{search:search,is_enable:data?.status,expiry_start_date:data?.startdate,expiry_end_date:data?.enddate}})
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error while fetching lead request:", error);
        throw error;
      });
  };
export const UpdateStatus = (id,data) => {
    return axiosInstance
      .put(`${UpdateOffers}/${id}/update/`,data)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error while fetching lead request:", error);
        throw error;
      });
  };
export const UpdateOffer = (id,data) => {
  console.log(data)
    return axiosInstance
      .put(`${UpdateOffers}/${id}/update/`,data, {
        headers: {
            'Content-Type': 'multipart/form-data', // Important for sending form data
        }})
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error while fetching lead request:", error);
        throw error;
      });
  };

export const CreateOffer = (data) => {
  console.log(data)
    return axiosInstance
      .post(`${UpdateOffers}/create/`,data,
      //  {
      //   headers: {
      //       'Content-Type': 'multipart/form-data', // Important for sending form data
      //   }}
        )
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error while fetching lead request:", error);
        throw error;
      });
  };

export const getDiscountOfferView = (id) => {
    return axiosInstance
      .get(`${getOfferViews}/${id}/`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error while fetching lead request:", error);
        throw error;
      });
  };

  export const getExportdata = () => {
    return axiosInstance
      .get(exportdataURL)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error while fetching lead request:", error);
        throw error;
      });
  };
