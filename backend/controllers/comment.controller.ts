import { Request, Response } from "express";
import commentModel from "../models/comment.model";
import blogModel from "../models/blog.model";
import mongoose from "mongoose";

// POST COMMENT
export const giveComment = async (req: Request, res: Response) => {
  const { name, comment, rating } = req.body;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid blog Id or blog not found!' });
  }

  const blogPost = await blogModel.findById(id);
  if (!blogPost) {
    return res.status(404).json({ message: "Blog post not found" });
  }

  if (!name) {
    return res
      .status(500)
      .json({ success: false, message: "Please enter your name" });
  }
  if (!comment) {
    return res
      .status(500)
      .json({ success: false, message: "Please write comment" });
  }
  if (!rating) {
    return res
      .status(500)
      .json({ success: false, message: "Rating is required" });
  }

  try {
    const newComment = {
      name,
      comment,
      rating,
      blogId: id,
    };

    const currComment = await commentModel.create(newComment);
    res.status(201).json({
      success: true,
      comment: currComment,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL COMMENTS BY BLOGID
export const getComments = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid blog Id or blog not found!' });
    }
    
    const blogPost = await blogModel.findById(id);
    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    
    const comments = await commentModel.find({ blogId: id });
    return res.json({ success: true, comments });
  } catch (err: any) {
    return res
      .status(500)
      .json({ success: false, message: err.message || "Server error" });
  }
};
