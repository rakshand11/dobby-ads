import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter } from "./route/user.route.js";
import { folderRouter } from "./route/folder.route.js";
import { imageRouter } from "./route/image.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to database");
  } catch (error) {
    console.log("Not connected to database", error);
  }
};
connectToDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/folder", folderRouter);
app.use("/image", imageRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
