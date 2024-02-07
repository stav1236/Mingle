import fs from "fs";
import http from "http";
import https from "https";
import dotenv from "dotenv";

import initApp from "./app";
import logger from "./common/config/logger";

dotenv.config();
process.on("uncaughtException", (err) => {
  logger.error("uncaughtException", err);
});

const POST_DEV = 80;
const POST_PROD = 443;

initApp().then((app) => {
  if (process.env.NODE_ENV !== "production") {
    http.createServer(app).listen(POST_DEV, () => {
      logger.info(`Server is running at http://localhost:${POST_DEV}`);
    });
  } else {
    const options = {
      key: fs.readFileSync("./client-key.pem"),
      cert: fs.readFileSync("./client-cert.pem"),
    };

    https.createServer(options, app).listen(POST_PROD, () => {
      logger.info(`Server is running at https://localhost:${POST_PROD}`);
    });
  }
});
