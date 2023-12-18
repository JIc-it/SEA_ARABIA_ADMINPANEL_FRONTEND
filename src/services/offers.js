import axiosInstance from "./authHandle";

const getOfferLists="offer/offers/admin";
const getOfferViews="offer/offers";
const UpdateOffers="offer/offers";
const companylisting="company/companycms-list"
const serviceOnelisting="service/service-filter-list-cms"


export const getCompanyListing = () => {
    return axiosInstance
      .get(companylisting)
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
export const getDiscountOfferList = () => {
    return axiosInstance
      .get(getOfferLists)
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