import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/";

// const axiosInstance = axios.create({
//     baseURL: API_BASE_URL,
//     timeout: 10000,
// });

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data", // Set the Content-Type header here
  },
});

let isRefreshing = false;

if (localStorage.getItem("refresh_token")) {
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    const response = await axiosInstance.post("/api/token/refresh/", {
      refresh: refreshToken,
    });
    if (response.data && response.data.access) {
      const newAccessToken = response.data.access;
      localStorage.setItem("access_token", newAccessToken);
      isRefreshing = false;
      return newAccessToken;
    }
  };

  axiosInstance.interceptors.request.use(async (config) => {
    if (
      config.url !== "/account/token/" &&
      localStorage.getItem("access_token")
    ) {
      const accessToken = localStorage.getItem("access_token");
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  }, undefined);

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        if (!isRefreshing) {
          isRefreshing = true;
          const accessToken = await refreshAccessToken();

          if (accessToken) {
            localStorage.setItem("access_token", accessToken);
            error.config.headers["Authorization"] = `Bearer ${accessToken}`;
            return axiosInstance(error.config);
          }
        }
      }
      return Promise.reject(error);
    }
  );
}

export default axiosInstance;
