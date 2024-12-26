import "express-async-errors";
import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import { authenticateUser } from "./middleware/authMiddleware.js";
import errorHandlerMiddleware from "./middleware/ErrorHandler.js";

import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

// Setting path to the dotenv file.
dotenv.config();

const app = express();
const port = process.env.PORT || 5100;

//Setting up the root path.
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend origin
    credentials: true, // Allow credentials (cookies)
  })
);
// For diplay the route and request information..
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Serving file statically.
app.use(express.static(path.resolve(__dirname, "./client/dist")));

// For parsing json data.
app.use(express.json());
// Cookie parser.
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authenticateUser, userRouter);

// for deployment.
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

// Not found Routes Error.
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

//Error Handler Middlewar.
app.use(errorHandlerMiddleware);

try {
  mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(
      `server running and connected to Database on http://localhost:${port}`
    );
  });
} catch (error) {
  console.log(error);
  console.log("falid to connect to the data base.");
  process.exit(1);
}
