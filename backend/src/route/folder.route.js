import { Router } from "express";
import {
  createFolder,
  deleteFolder,
  getFolder,
  getFolders,
} from "../controller/folder.controller.js";
import { middleware } from "../middleware/middleware.js";

export const folderRouter = Router();

folderRouter.use(middleware);

folderRouter.post("/", createFolder);
folderRouter.get("/", getFolders);
folderRouter.get("/:id", getFolder);
folderRouter.delete("/:id", deleteFolder);
