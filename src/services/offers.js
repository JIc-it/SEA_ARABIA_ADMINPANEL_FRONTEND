import axiosInstance from "./authHandle";

const getOfferLists="offer/offers/admin";
const getOfferViews="offer/offers";
const UpdateOffers="offer/offers";

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

export const getDiscountOfferView = (id) => {
    return axiosInstance
      .get(`${getOfferViews}/${id}/`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error while fetching lead request:", error);
        throw error;
      });
  };