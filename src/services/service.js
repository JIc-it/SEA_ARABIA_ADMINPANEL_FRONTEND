import axiosInstance from "./authHandle";

const ServicelistURL="service/service-list"
const GetOneService="service/service-view"
const categorylist="main/category-list"

export const getServiceListing = () => {
    return axiosInstance
      .get(ServicelistURL)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error while fetching lead request:", error);
        throw error;
      });
  };

export const getOneService = (id) => {
    return axiosInstance
      .get(`${GetOneService}/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error while fetching lead request:", error);
        throw error;
      });
  };

export const getCategoryList = () => {
    return axiosInstance
      .get(`${categorylist}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error while fetching lead request:", error);
        throw error;
      });
  };