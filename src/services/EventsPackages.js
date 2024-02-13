import axiosInstance from "./authHandle";

const eventList="service/package-list";
const CountURL="service/package-count"
const eventViewURL="service/package-view"
const updateEventURL="service/package-update"
const createEventURL="service/package-create"
const exportURL="service/export-package-list"

export const getEventList = (search) => {
  return axiosInstance
    .get(eventList,{params:{search:search}})
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

export const updateEvent = (id,data) => {
  return axiosInstance
    .put(`${updateEventURL}/${id}`,data, {
      headers: { "Content-Type":'multipart/form-data', Accept: "*/*" },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
export const createEvent = (data) => {
  return axiosInstance
    .post(`${createEventURL}`,data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getExport = () => {
  return axiosInstance
    .get(exportURL)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};