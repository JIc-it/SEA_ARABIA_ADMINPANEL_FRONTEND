import axiosInstance from "./authHandle";
const getIndivitualVendorListUrl = "/account/vendor-list-details";
const updateVendorDetails = "account/vendor-add-details";
const updateCustomerDetails = "account/users-update";
const customerCount = "account/user-count-admin";
const exportData = "/account/customer-list-export/";
const customerBooking = "/booking/userbased-individual-booking";
// const serviceDetails = "main/category-list";
const guestUserURL = "account/guest-user/list";
const customerCreateUrl = "/account/user-create";

export const getCustomerlist = (role) => {
  return axiosInstance
    .get("account/user-list", { params: { role: role } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const createCustomer = async (data) => {
  try {
    const response = await axiosInstance.post(customerCreateUrl, data);
    return response.data;
  } catch (error) {
    console.error("Error while creating customer:", error);
    throw error;
  }
};

export const getCustomerSearch = (params) => {
  return axiosInstance
    .get("account/user-list", {
      params: params,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching customer request:", error);
      throw error;
    });
};
export const getCustomerListById = (customerId) => {
  return axiosInstance
    .get(`${getIndivitualVendorListUrl}/${customerId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching customer request:", error);
      throw error;
    });
};

export const customerExport = (queryParams) => {
  return axiosInstance
    .get(`${exportData}`, { params: queryParams })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching customer export request:", error);
      throw error;
    });
};

export const customerIndividualBooking = (customerId) => {
  return axiosInstance
    .get(`${customerBooking}${customerId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching individual booking list", error);
    });
};

export const UpdateVendorListById = (vendorId, data) => {
  return axiosInstance
    .put(`${updateVendorDetails}/${vendorId}`, data, {
      headers: { "Content-Type": "application/json", Accept: "*/*" },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching vendor request:", error);
      throw error;
    });
};

export const UpdateCustomerListById = (customerId, data) => {
  return axiosInstance
    .put(`${updateCustomerDetails}/${customerId}`, data, {
      headers: { "Content-Type": "application/json", Accept: "*/*" },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching customer request:", error);
      throw error;
    });
};

export const getCustomerTotalCount = () => {
  return axiosInstance
    .get(customerCount)
    .then((response) => response.data)
    .catch((error) => {
      console.error(
        "Error while fetching total count of customer request:",
        error
      );
      throw error;
    });
};

export const getGuestUserRequest = (search, status, role) => {
  return axiosInstance
    .get(guestUserURL, {
      params: { search: search, status: status, role: role },
    })
    .then((response) => {
      console.log("Reward Products Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error while fetching reward products:", error);
      throw error;
    });
};

export const getTotalGuestUser = () => {
  return axiosInstance
    .get("account/guest-user/list")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getLocation = () => {
  return axiosInstance
    .get("account/gcc-locations")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching location request:", error);
    });
};
const activityData = "/report/log-list";
export const getActivityData = (customerId, data) => {
  return axiosInstance
    .get(`${activityData}/${customerId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(
        "Error --while fetching customer booking details request:",
        error
      );
      throw error; // Propagate the error for further handling
    });
};
