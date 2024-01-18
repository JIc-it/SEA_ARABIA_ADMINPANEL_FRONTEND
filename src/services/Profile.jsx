import axiosInstance from "./authHandle";


export const getProfileData = () => {
    return axiosInstance
      .get(`account/users-profile/`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error while fetching lead request:", error);
        throw error;
      });
  };

export const ProfileChangePassword = (data) => {
    return axiosInstance
      .post(`account/profile-reset-password/`,data)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error while fetching lead request:", error);
        throw error;
      });
  };
