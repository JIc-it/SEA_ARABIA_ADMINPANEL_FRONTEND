import axiosInstance from "./authHandle";

const bookingList = "booking/bookings/admin";

const booking = "booking/admin-booking-view";
const refundinitiateURL = "booking/initilize-refund-admin";
const cancellationrequestURL = "booking/booking-cancellation";
const bookingCountURL = "booking/admin-booking-count";
const refundrequestCountURL = "booking/admin-refund-count";
const refundhistoryCountURL = "booking/admin-refund-history-count";
const userListURl="booking/UserList"
const guestListURl="booking/GuestList"
const bookingExport="booking/booking-export/"
const refundRequestExport="booking/refund-request-export/"
const refundHistoryExport="booking/refund-history-export/"

export const getBookingList = (data) => {
  return axiosInstance
    .get(bookingList, { headers: { "Content-Type": "application/json", Accept: "*/*" },
      params: {
        status: data?.status,
        search: data?.search,
        refund_status: data?.refund_status,
        id: data?.id,
        user:data?.user,
        guest:data?.guest,
        slot_start_date__gte:data?.commencement_date?.from,
        slot_start_date__lte:data?.commencement_date?.to,
        user_type:data?.user_type,
        created_at__gte:data?.creation_date?.from,
        created_at__lte:data?.creation_date?.to,
        company:data?.company,
        category:data?.category,
        cancelled_by:data?.cancelled_by,
        cancelled_date__gte:data?.cancelled_on?.from,
        cancelled_date__lte:data?.cancelled_on?.to
      },
    },)
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

export const updateRefund = (id, data) => {
  return axiosInstance
    .put(`${refundinitiateURL}/${id}`, data)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const updateCancellation = (id) => {
  return axiosInstance
    .put(`${cancellationrequestURL}/${id}/`)
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

export const getUserList = () => {
  return axiosInstance
    .get(userListURl)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
export const getGuestList = () => {
  return axiosInstance
    .get(guestListURl)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};

export const getBookingExport = () => {
  return axiosInstance
    .get(bookingExport)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
export const getRefundRequestExport = () => {
  return axiosInstance
    .get(refundRequestExport)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
export const getRefundHistoryExport = () => {
  return axiosInstance
    .get(refundHistoryExport)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error while fetching lead request:", error);
      throw error;
    });
};
