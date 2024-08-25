import mongoose, { Document, Schema } from "mongoose";

interface ContentItem {
  cTitle: string;
  cDesc: string;
}

interface IClassroom extends Document {
  title: string;
  coverImgUrl: string;
  contentData: ContentItem[];
  conclusion: string;
}

const blog: Schema<IClassroom> = new mongoose.Schema(
  {
    title: String,
    coverImgUrl: String,
    contentData: [{ cTitle: String, cDesc: String }],
    conclusion: String,
  },
  {
    timestamps: true,
  }
);

const blogModel = mongoose.model<IClassroom>("Blog", blog);
export default blogModel;
