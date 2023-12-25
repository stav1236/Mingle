import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  getAccessToken,
  saveAccessToken,
  getRefreshToken,
  saveRefreshToken,
} from "./tokenService";

export const nonTokenAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

const mingleAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

mingleAxios.interceptors.request.use(
  async (config: any) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

mingleAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          const refreshedToken = await refreshAccessToken(refreshToken);

          if (refreshedToken) {
            originalRequest.headers.Authorization = `Bearer ${refreshedToken}`;
            saveAccessToken(refreshedToken);
            return mingleAxios(originalRequest);
          }
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

const refreshAccessToken = async (
  refreshToken: string
): Promise<string | null> => {
  try {
    const response = await nonTokenAxios.post("auth/refresh-token", {
      refreshToken,
    });

    saveAccessToken(response.data.accessToken);
    saveRefreshToken(response.data.refreshToken);

    return response.data.accessToken;
  } catch (error) {
    throw error;
  }
};

export default mingleAxios;
