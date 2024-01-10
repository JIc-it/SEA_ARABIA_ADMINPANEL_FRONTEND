import axiosInstance from "./authHandle";

const eventList="service/package-list";
const CountURL="service/package-count"
const eventViewURL="service/package-view"

export const getEventList = () => {
  return axiosInstance
    .get(eventList)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getCount = () => {
  return axiosInstance
    .get(CountURL)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getEventView = (id) => {
  return axiosInstance
    .get(`${eventViewURL}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};