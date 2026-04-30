import { Router } from "express";
import {
  uploadImage,
  getImages,
  deleteImage,
} from "../controller/image.controller.js";
import { middleware } from "../middleware/middleware.js";
import { upload } from "../config/cloudinary.js";

export const imageRouter = Router();

imageRouter.use(middleware);

imageRouter.post("/", upload.single("image"), uploadImage);
imageRouter.get("/", getImages);
imageRouter.delete("/:id", deleteImage);
