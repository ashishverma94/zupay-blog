import jwt, { Secret } from "jsonwebtoken";
import userModel from "../models/user.model";
import { Response, NextFunction, Request } from "express";
require("dotenv").config();

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  console.log(req.cookies);

  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Please Login to continue." });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as Secret) as {
    id: string;
  };
  const user = await userModel.findById(decoded.id);
  if (!user) {
    return res.status(401).json({ success: false, message: "User not found." });
  }

  
  req.user = user;

  next();
};
