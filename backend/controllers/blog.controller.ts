import { Request, Response } from "express";
import blogModel from "../models/blog.model";

// CREATE BLOG
export const createBlog = async (req: Request, res: Response) => {
  const { title, coverImgUrl, contentData, conclusion } = req.body;

  try {
    const newBlog = {
      title,
      coverImgUrl,
      contentData,
      conclusion,
    };

    const blog = await blogModel.create(newBlog);

    res.status(201).json({
      success: true,
      blog,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE BLOG
export const updateBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, coverImgUrl, contentData, conclusion } = req.body;

  try {
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "This blog not found" });
    }

    blog.title = title;
    blog.coverImgUrl = coverImgUrl;
    blog.contentData = contentData;
    blog.conclusion = conclusion;

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error: any) {
    console.error("Error updating classroom:", error);
    res.status(400).json({ message: error.message });
  }
};

// DELETE BLOG
export const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log(id)
  try {
    await blogModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// GET BLOG BY ID
export const getBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const blog = await blogModel.findById(id);
    res.status(201).json({
      success: true,
      blog,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL BLOGS
export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await blogModel.find();
    return res.json({ success: true, blogs });
  } catch (err: any) {
    return res
      .status(500)
      .json({ success: false, message: err.message || "Server error" });
  }
};
