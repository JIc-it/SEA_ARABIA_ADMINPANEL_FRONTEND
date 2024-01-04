import axiosInstance from "./authHandle";

const ServicelistURL = "service/service-list"
const GetOneService = "service/service-view"
const categorylist = "main/category-list"
const subCategorylist = "main/subcategory-list"
const amenitieslist = "service/amenity-list"
const UpdateServiceURL = "service/service-update"
const CreateServiceURL = "service/service-create"
const addImageURl = "service/service-image/create"
const addMultipleImageURl = "service/serviceimage/create"
const removeImageURL = "service/service-image/delete"
const SetThumbnailURl="service/service-image/status"
const locationlistURl="service/destination-list"
const profitMethodURl="service/profit-method-list"
const deletePriceURl="/service/price/delete"

export const getServiceListing = () => {
  return axiosInstance
    .get(ServicelistURL)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getProfitMethod = () => {
  return axiosInstance
    .get(profitMethodURl)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getLocationListing = () => {
  return axiosInstance
    .get(locationlistURl)
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
    .put(`${UpdateServiceURL}/${id}`, data,{
      headers: { "Content-Type": "application/json", Accept: "*/*" },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
export const CreateService = (data) => {
  return axiosInstance
    .post(`${CreateServiceURL}`, data,{
      headers: { "Content-Type": "application/json", Accept: "*/*" },
    })
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
export const AddMultipleImage = (data) => {
  return axiosInstance
    .post(`${addMultipleImageURl}`, data,{headers: {
      'Content-Type': 'multipart/form-data', 
    },})
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

export const DeleteOnePrice = (id) => {
  return axiosInstance
    .delete(`${deletePriceURl}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};