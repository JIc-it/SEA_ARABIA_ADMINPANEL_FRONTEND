import axiosInstance from "./authHandle";

const bookingList="booking/bookings/admin"

export const getBookingList = () => {
  return axiosInstance
    .get(bookingList)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};