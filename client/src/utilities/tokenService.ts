import Cookies from "js-cookie";

const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";

export const saveAccessToken = (token: string): void => {
  Cookies.set(ACCESS_TOKEN_COOKIE, token);
};

export const getAccessToken = (): string | undefined => {
  return Cookies.get(ACCESS_TOKEN_COOKIE);
};

export const removeAccessToken = (): void => {
  Cookies.remove(ACCESS_TOKEN_COOKIE);
};

export const saveRefreshToken = (token: string): void => {
  Cookies.set(REFRESH_TOKEN_COOKIE, token, { expires: 30 });
};

export const getRefreshToken = (): string | undefined => {
  return Cookies.get(REFRESH_TOKEN_COOKIE);
};

export const removeRefreshToken = (): void => {
  Cookies.remove(REFRESH_TOKEN_COOKIE);
};
