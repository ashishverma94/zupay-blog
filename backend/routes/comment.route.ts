import express from "express";
import { getComments, giveComment } from "../controllers/comment.controller";

const commentRouter = express.Router();

commentRouter.post("/post-comment/:id", giveComment as any);
commentRouter.get("/get-comments/:id", getComments as any);

export default commentRouter;
