import jwt, { Secret } from "jsonwebtoken";
import userModel, { IUser } from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import UserRequest from "../@types/custom" ;

require("dotenv").config();

// REGISTER USER
interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body as IRegistrationBody;
    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
      return res.status(400).json({ message: "Email already exist" });
    }

    await userModel.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// LOGIN USER
interface ILoginRequest {
  email: string;
  password: string;
}

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body as ILoginRequest;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter email and password" });
    }

    const user: IUser = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    } 

    const options = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 *1000),
      httpOnly: true,
    };

    //  

    const token = user.getJwtToken();

    user.password = "";
    res.status(201).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// LOGOUT USER
export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(201).json({
      success: true,
      message: "Log out Successfully!",
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET USER 
export const getUser = async (req:Request, res:Response) => {
  const userId = req.user?._id;
  console.log(req.user) ;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "cannot find user" });
    }
    return res.status(200).send({ user });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error Getting my details!", error });
  }
};
