import http from "http";
import https from "https";
import dotenv from "dotenv";

import initApp from "./app";
import logger from "./common/config/logger";

dotenv.config();
process.on("uncaughtException", (err) => {
  logger.error("uncaughtException", err);
});

const port = 3000;

initApp().then((app) => {
  if (process.env.NODE_ENV !== "production") {
    http.createServer(app).listen(port, () => {
      logger.info(`Server is running at http://localhost:${port}`);
    });
  } else {
    https.createServer(app).listen(port, () => {
      logger.info(`Server is running at http://localhost:${port}`);
    });
  }
});
