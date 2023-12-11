import express from "express";
import path from "path";

import postRouter from "./routes/PostRH";
import userRouter from "./routes/UserRH";
import logger from "./common/config/logger";

const app = express();
const port = 3000;

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
