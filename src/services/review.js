import axiosInstance from "./authHandle";
const subcategoryidURl = "main/subcategory-list"
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
    .get("main/subcategory-list", { params: { category: id } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
export const getServiceFilterList = (data) => {
  return axiosInstance
    .get("service/service-filter-list-cms", { params: { search: data.search, company: data?.company, category: data?.categoryid, sub_category: data?.subcategoryid } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
export const getServiceReviewFilter = (rating) => {
  return axiosInstance
    .get(`service/service-review-list`, { params: { rating: rating } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
export const getServiceReviewFilter2 = (id, rating) => {
  return axiosInstance
    .get(`service/service-review-list`, { params: { service_id: id, rating: rating } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};


export const createAvailablity = async (data) => {
  try {
    if (data) {
      const timeAsString = data.time.toString();
      const jsonData = JSON.stringify({
        time: timeAsString,
        // service: data.service,
        // update_type:'time'
        //   // date: data.date,
        // time: data.time
      })
      const response = await axiosInstance.patch(
        `service/update-availability/${data.service}/${data.date}/${data.update_type}/`,
        jsonData,
        {
          headers: { "Content-Type": "application/json", Accept: "*/*" }
          , params: {

            // update_type:'time',
            // time: data.time,
          }
        }
      );

      return response.data;
    }
  } catch (error) {
    console.error("Error while updating availability:", error);
    throw error;
  }
};

export const getsServicesavailableFilterList = (data) => {
  return axiosInstance
    .get(`service/availability-retrieve/${data?.date}/${data?.machineId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const subcategoryIdFilter = (id) => {
  return axiosInstance
    .get(`${subcategoryidURl}`, { params: { category: id } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching order request:", error);
      throw error;
    });
};


export const getBookServiceFilter = (id, date) => {
  const [year, month, day] = date.split('-');

  // Create the reversed date string
  const reversedDate = `${day}-${month}-${year}`;

  return axiosInstance
    .get(`service/availability-retrieve/${reversedDate}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
