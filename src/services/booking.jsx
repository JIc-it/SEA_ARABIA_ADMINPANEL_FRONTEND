import axiosInstance from "./authHandle";

const bookingList="booking/bookings/admin"
const booking="booking/admin-booking-view"
const refundinitiateURL="booking/initilize-refund-admin"
const cancellationrequestURL="booking/booking-cancellation"

export const getBookingList = () => {
  return axiosInstance
    .get(bookingList)
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