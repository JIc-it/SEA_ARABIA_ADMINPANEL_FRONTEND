import axiosInstance from "./authHandle";
const getIndivitualVendorListUrl = "/account/vendor-list-details";
const updateVendorDetails = "account/vendor-add-details";
const updateCustomerDetails = "account/users-update";
const customerCount = "account/user-count-admin";
// const serviceDetails = "main/category-list";
const guestUserURL = "account/guest-user/list";

export const getCustomerlist = (role) => {
  return axiosInstance
    .get("account/user-list", { params: { role: role } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getCustomerSearch = (search, status, role) => {
  return axiosInstance
    .get("account/user-list", {
      params: { search: search, status: status, role: role },
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

// export const getServiceDataById = (customerId) => {
//   return axiosInstance
//     .get(`${serviceDetails}/${customerId}`)
//     .then((response) => response.data)
//     .catch((error) => {
//       console.error(
//         "Error while fetching customer service details request:",
//         error
//       );
//     });
// };
// export const getVendorServiceDataById = () => {
//   return axiosInstance
//     .get(serviceDetails)
//     .then((response) => response.data)
//     .catch((error) => {
//       console.error("Error while fetching lead request:", error);
//       throw error;
//     });
// };
