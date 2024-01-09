import axiosInstance from "./authHandle";

const bookingList="booking/bookings/admin"
const booking="booking/admin-booking-view"
const refundinitiateURL="booking/initilize-refund-admin"
const cancellationrequestURL="booking/booking-cancellation"
const bookingCountURL="booking/admin-booking-count"
const refundrequestCountURL="booking/admin-refund-count"
const refundhistoryCountURL="booking/admin-refund-history-count"

export const getBookingList = (data) => {
  return axiosInstance
    .get(bookingList,{params:{status:data.status,search:data.search,refund_status:data.refund_status}})
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getBooking = (id) => {
  return axiosInstance
    .get(`${booking}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const updateRefund = (id,data) => {
  return axiosInstance
    .put(`${refundinitiateURL}/${id}`,data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const updateCancellation = (id) => {
  return axiosInstance
    .put(`${cancellationrequestURL}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getBookingCount = () => {
  return axiosInstance
    .get(bookingCountURL)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getRefundRequestCount = () => {
  return axiosInstance
    .get(refundrequestCountURL)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getRefundHistoryCount = () => {
  return axiosInstance
    .get(refundhistoryCountURL)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};