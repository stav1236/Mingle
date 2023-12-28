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

let isAlreadyAskForToken = false;

nonTokenAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      window.location.href = "/Auth";
    }

    return Promise.reject(error);
  }
);

const mingleAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

mingleAxios.interceptors.request.use(
  async (config: any) => {
    const accessToken = getAccessToken();
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };

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
          if (!isAlreadyAskForToken) {
            isAlreadyAskForToken = true;
            const refreshedToken = await refreshAccessToken(refreshToken);
            if (refreshedToken) {
              originalRequest.headers.Authorization = `Bearer ${refreshedToken}`;
              saveAccessToken(refreshedToken);

              isAlreadyAskForToken = false;
              return mingleAxios(originalRequest);
            }
          }
        } catch (refreshError) {
          isAlreadyAskForToken = false;
          console.error("Error refreshing token:", refreshError);
        }
      } else {
        window.location.href = "/Auth";
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
    localStorage.setItem("_id", response.data._id);

    return response.data.accessToken;
  } catch (error) {
    throw error;
  }
};

export default mingleAxios;
