import cors from "cors";
import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import connectDB from "./utils/db";
import cookieParser from "cookie-parser";

dotenv.config();

// APP
export const app: Express = express();
// BODY PARSER
app.use(express.json({ limit: "50mb" }));
// COOKIE PARSER
app.use(cookieParser());
// CORS [CROSS ORIGIN RESOURCE SHARING]
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// ROUTES
import userRouter from "./routes/user.route";
import blogRouter from "./routes/blog.route";
app.use("/", userRouter, blogRouter);

// TESTING API
app.get("/", (req: Request, res: Response) =>
  res.status(200).json({ success: true, message: "API is working, PING/PONG" })
);

// UNKNOWN ROUTE
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found!`);
  next(err);
});

// SERVER
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is connected with port ${process.env.PORT}`);
  connectDB();
});
