import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/CustomError.js";
import UserModel from "../models/UserModel.js";

export const getUserDetails = async (req, res, next) => {
  const user = await UserModel.findById(req.user.userId);
  if (!user) throw new NotFoundError("User not found.");
  res.status(StatusCodes.OK).json({ user, success: true });
};
