import { folderModel } from "../model/folder.model.js";
import { imageModel } from "../model/image.model.js";
import { cloudinary } from "../config/cloudinary.js";

export const createFolder = async (req, res) => {
  try {
    const { name, parentId } = req.body;
    const ownerId = req.userId;

    if (!name) {
      res.status(400).json({ msg: "Folder name is required" });
      return;
    }

    let ancestors = [];

    if (parentId) {
      const parentFolder = await folderModel.findOne({
        _id: parentId,
        owner: ownerId,
      });

      if (!parentFolder) {
        res.status(404).json({ msg: "Parent folder not found" });
        return;
      }

      ancestors = [...parentFolder.ancestors, parentFolder._id];
    }

    const folder = await folderModel.create({
      name,
      owner: ownerId,
      parent: parentId || null,
      ancestors,
    });

    res.status(201).json({ msg: "Folder created successfully", folder });
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(409)
        .json({ msg: "A folder with that name already exists here" });
      return;
    }
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getFolders = async (req, res) => {
  try {
    const { parentId } = req.query;
    const ownerId = req.userId;

    const folders = await folderModel
      .find({
        owner: ownerId,
        parent: parentId || null,
      })
      .sort({ createdAt: -1 });

    const foldersWithSize = await Promise.all(
      folders.map(async (folder) => {
        const totalSize = await getRecursiveSize(folder._id);
        return { ...folder.toObject(), totalSize };
      }),
    );

    res.status(200).json({ folders: foldersWithSize });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const ownerId = req.userId;

    const folder = await folderModel
      .findOne({ _id: id, owner: ownerId })
      .populate("ancestors", "name");

    if (!folder) {
      res.status(404).json({ msg: "Folder not found" });
      return;
    }

    const totalSize = await getRecursiveSize(folder._id);

    res.status(200).json({ folder: { ...folder.toObject(), totalSize } });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const ownerId = req.userId;

    const folder = await folderModel.findOne({ _id: id, owner: ownerId });
    if (!folder) {
      res.status(404).json({ msg: "Folder not found" });
      return;
    }

    const descendants = await folderModel
      .find({ ancestors: id, owner: ownerId })
      .select("_id");

    const allFolderIds = [id, ...descendants.map((f) => f._id)];

    const images = await imageModel.find({ folder: { $in: allFolderIds } });

    await Promise.all(
      images.map((img) => cloudinary.uploader.destroy(img.publicId)),
    );

    await imageModel.deleteMany({ folder: { $in: allFolderIds } });

    await folderModel.deleteMany({ _id: { $in: allFolderIds } });

    res.status(200).json({ msg: "Folder and all its contents deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getRecursiveSize = async (folderId) => {
  const descendants = await folderModel
    .find({ ancestors: folderId })
    .select("_id");

  const allFolderIds = [folderId, ...descendants.map((f) => f._id)];

  const result = await imageModel.aggregate([
    { $match: { folder: { $in: allFolderIds } } },
    { $group: { _id: null, totalSize: { $sum: "$size" } } },
  ]);

  return result[0]?.totalSize || 0;
};
