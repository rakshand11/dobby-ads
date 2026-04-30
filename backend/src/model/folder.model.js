import mongoose, { Schema } from "mongoose";

const folderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "folder",
      default: null,
    },

    ancestors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "folder",
      },
    ],
  },
  { timestamps: true },
);

folderSchema.index({ name: 1, parent: 1, owner: 1 }, { unique: true });

export const folderModel = mongoose.model("folder", folderSchema);
