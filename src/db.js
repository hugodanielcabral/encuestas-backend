import mongoose from "mongoose";
import env from "dotenv";

env.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_STRING_CONNECTION);
    console.log("Database connected");
  } catch (error) {
    console.log("Error connecting to the database", error);
  }
};
