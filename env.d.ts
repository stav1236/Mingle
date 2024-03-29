declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    PORT: string;
    DB_CONNECTION_STRING: string;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    JWT_TOKEN_EXPIRATION: string;
    COIN_MARKET_CAP_API_TOKEN: string;
    GOOGLE_CLIENT_ID: string;
  }
}
