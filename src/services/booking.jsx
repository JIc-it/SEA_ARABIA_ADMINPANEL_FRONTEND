import axiosInstance from "./authHandle";

const bookingList="booking/bookings/admin"
const booking="booking/admin-booking-view"

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