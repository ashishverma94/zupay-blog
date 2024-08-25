import express from "express";
import {
  getBlog,
  getBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blog.controller";

const blogRouter = express.Router();

blogRouter.post("/posts", createBlog as any);
blogRouter.put("/posts/:id", updateBlog as any);
blogRouter.get("/posts/:id", getBlog as any);
blogRouter.get("/posts", getBlogs as any);
blogRouter.delete("/posts/:id", deleteBlog as any);

export default blogRouter;
