import mongoose from "mongoose";
import config from "config";

const dbUrl = config.get<string>("dbConfig.url");

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(dbUrl);
};

export { connectDB };
