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
