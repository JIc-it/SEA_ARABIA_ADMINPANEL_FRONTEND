import axiosInstance from "./authHandle";

export const getCategoryist = () => {
  return axiosInstance
    .get("main/category-list")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
export const getSubCategoryist = (id) => {
  return axiosInstance
    .get("main/subcategory-list",{params:{category:id}})
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
export const getServiceFilterList = (data) => {
  return axiosInstance
    .get("service/service-filter-list-cms",{params:{search:data.search,category:data?.categoryid,sub_category:data?.subcategoryid}})
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
export const getServiceReviewFilter = (rating) => {
  return axiosInstance
    .get(`service/service-review-list`,{params:{rating:rating}})
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
export const getServiceReviewFilter2 = (id,rating) => {
  return axiosInstance
    .get(`service/service-review-list`,{params:{service_id:id,rating:rating}})
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
