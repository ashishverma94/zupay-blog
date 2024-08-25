import mongoose, { Document, Schema } from "mongoose";

interface IComment extends Document {
  blogId: string;
  name: string;
  comment: string;
  rating: number;
}

const comment: Schema<IComment> = new mongoose.Schema(
  {
    blogId: { type: String, required: true },
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const commentModel = mongoose.model<IComment>("Comment", comment);
export default commentModel;
