import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import postRouter from "./routes/PostRH";
import userRouter from "./routes/UserRH";
import connectToDatabase from "./data/base";
import logger from "./common/config/logger";

dotenv.config();

const app = express();
const port = 3000;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

if (!DB_CONNECTION_STRING) {
  logger.error("MongoDB connection string not provided in the .env file");
  process.exit(1);
}

connectToDatabase(DB_CONNECTION_STRING);

app.use(cors());
app.use(express.json());
app.use(express.static("mingle-client/dist"));

app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    logger.info(`Received ${req.method} request at ${req.path}`);
  }
  next();
});

app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

app.get("*", (req, res) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.resolve("mingle-client/dist", "index.html"));
  } else {
    res.status(404).sendFile(path.resolve("src/assets/pages/404.html"));
  }
});

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});
