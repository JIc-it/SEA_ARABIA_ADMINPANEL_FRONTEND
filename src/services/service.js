import axiosInstance from "./authHandle";

const ServicelistURL = "service/service-list"
const GetOneService = "service/service-view"
const categorylist = "main/category-list"
const subCategorylist = "main/subcategory-list"
const amenitieslist = "service/amenity-list"
const UpdateServiceURL = "service/service-update"
const addImageURl = "service/service-image/create"
const removeImageURL = "service/service-image/delete"
const SetThumbnailURl="service/service-image/status"

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

export const getsubcategorylist = (id) => {
  return axiosInstance
    .get(`${subCategorylist}`, { params: { category: id } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getamenitieslist = () => {
  return axiosInstance
    .get(`${amenitieslist}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
export const UpdateService = (id, data) => {
  return axiosInstance
    .put(`${UpdateServiceURL}/${id}`, data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const AddImage = (data) => {
  return axiosInstance
    .post(`${addImageURl}`, data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const DeleteImage = (id) => {
  return axiosInstance
    .delete(`${removeImageURL}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const SetThumbNail = (id, data) => {
  return axiosInstance
    .put(`${SetThumbnailURl}/${id}`, {
      is_thumbnail:"True",
      service_id:data
  })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
