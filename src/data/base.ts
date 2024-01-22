import mongoose, { ConnectOptions } from "mongoose";
import logger from "../common/config/logger";

const connectToDatabase = async (dbConnectionString: string): Promise<void> => {
  try {
    const options: ConnectOptions = {} as ConnectOptions;

    await mongoose.connect(dbConnectionString, options);

    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectToDatabase;
