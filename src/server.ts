import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import postRouter from "./routes/PostRH";
import userRouter from "./routes/UserRH";
import authRouter from "./routes/AuthRH";
import logger from "./common/config/logger";
import connectToDatabase from "./data/base";
import cryptoRouter from "./routes/CryptoRH";

dotenv.config();
process.on("uncaughtException", (err) => {
  logger.error("uncaughtException", err);
});

export const app = express();
const port = 3000;

const DB_CONNECTION_STRING =
  process.env.NODE_ENV === "test"
    ? process.env.DB_CONNECTION_STRING_TEST
    : process.env.DB_CONNECTION_STRING;

if (!DB_CONNECTION_STRING) {
  logger.error("MongoDB connection string not provided in the .env file");
  process.exit(1);
}

connectToDatabase(DB_CONNECTION_STRING);

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(express.static("client/dist"));

if (process.env.NODE_ENV === "development") {
  const options: swaggerJsDoc.Options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "MINGLE REST API",
        version: "1.0.0",
        description: "REST mingel server",
      },
    },
    servers: [
      { url: "http://localhost:3000", description: "Development server" },
    ],
    apis: ["./src/routes/*.ts", "./src/data/models/*.ts"],
  };

  const specs = swaggerJsDoc(options);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    logger.info(`Received ${req.method} request at ${req.path}`);
  }
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/crypto", cryptoRouter);

app.get("*", (req, res) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.resolve("client/dist", "index.html"));
  } else {
    res.status(404).sendFile(path.resolve("src/assets/pages/404.html"));
  }
});

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});
