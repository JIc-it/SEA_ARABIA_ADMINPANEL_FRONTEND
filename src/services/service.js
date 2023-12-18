import axiosInstance from "./authHandle";

const ServicelistURL="service/service-list"

export const getServiceListing = () => {
    return axiosInstance
      .get(ServicelistURL)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error while fetching lead request:", error);
        throw error;
      });
  };