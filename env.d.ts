declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    PORT: string;
    DB_CONNECTION_STRING: string;
  }
}
