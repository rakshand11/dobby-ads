import { imageModel } from "../model/image.model.js";
import { folderModel } from "../model/folder.model.js";
import { cloudinary } from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    const { name, folderId } = req.body;
    const ownerId = req.userId;

    if (!name || !folderId) {
      res.status(400).json({ msg: "Name and folderId are required" });
      return;
    }

    if (!req.file) {
      res.status(400).json({ msg: "Image file is required" });
      return;
    }

    const folder = await folderModel.findOne({ _id: folderId, owner: ownerId });
    if (!folder) {
      res.status(404).json({ msg: "Folder not found" });
      return;
    }

    const image = await imageModel.create({
      name,
      url: req.file.path,
      publicId: req.file.filename,
      size: req.file.size,
      folder: folderId,
      owner: ownerId,
    });

    res.status(201).json({ msg: "Image uploaded successfully", image });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getImages = async (req, res) => {
  try {
    const { folderId } = req.query;
    const ownerId = req.userId;

    if (!folderId) {
      res.status(400).json({ msg: "folderId is required" });
      return;
    }

    const folder = await folderModel.findOne({ _id: folderId, owner: ownerId });
    if (!folder) {
      res.status(404).json({ msg: "Folder not found" });
      return;
    }

    const images = await imageModel
      .find({ folder: folderId, owner: ownerId })
      .sort({ createdAt: -1 });

    res.status(200).json({ images });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const ownerId = req.userId;

    const image = await imageModel.findOne({ _id: id, owner: ownerId });
    if (!image) {
      res.status(404).json({ msg: "Image not found" });
      return;
    }
    await cloudinary.uploader.destroy(image.publicId);

    await image.deleteOne();

    res.status(200).json({ msg: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};
