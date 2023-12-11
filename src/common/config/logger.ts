import winston from "winston";
import path from "path";

const logFormat = winston.format.printf(
  ({ level, message, timestamp, label }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  }
);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.label({
      label: path.basename(process.mainModule!.filename),
    }),
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
      alias: "timestamp",
    }),
    logFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

export default logger;
