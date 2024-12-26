import { StatusCodes } from "http-status-codes";
import ejs from "ejs";
import crypto from "crypto";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import User from "../models/UserModel.js";
import { comparePassword, hashPassword } from "../utils/PasswordUtility.js";
import { NotFoundError, UnauthenticatedError } from "../errors/CustomError.js";
import { createJWT } from "../utils/tokenUtils.js";
import { sendMail } from "../utils/sendMail.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  // Hasing password.
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  //Creating User
  const user = await User.create(req.body);
  const data = { user };

  // getting the email template and passing data argument which is dynamic.
  const html = await ejs.renderFile(
    path.join(__dirname, "../mails/register-mail.ejs"),
    data
  );

  //     // sending Email.
  await sendMail(user.email, {
    subject: "Thank You For Your Registeration.",
    template: "register-mail.ejs",
    data,
    html,
  });
  res.status(StatusCodes.CREATED).json({ user });
};

export const login = async (req, res) => {
  // const user = await User.findOne({ email: req.body.email });

  // Find user by either email or name
  const user = await User.findOne({
    $or: [{ email: req.body.identifier }, { name: req.body.identifier }],
  });
  if (!user)
    throw new UnauthenticatedError(
      "User not registered. Plaese registered first."
    );

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");
  // one day 24 hr.
  const oneDay = 1000 * 60 * 60 * 24;

  // Generating token
  const token = createJWT({ userId: user._id, role: user.role });

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.CREATED).json({ msg: "user logged in", user });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

// Forgot password.
export const forgotPasswordRequest = async (req, res, next) => {
  const { email } = req.body;

  //     // looking for the email whether it is already registered or not.
  const user = await User.findOne({ email });
  //     // Throughing Error if email is already registered.

  if (!user) {
    throw new NotFoundError("Email is not found.");
  }
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/password/reset/${resetToken}`;
  const resetPasswordUrl = `http://localhost:5173/reset-password/${resetToken}`;

  const data = { user, link: resetPasswordUrl };
  // getting the email template and passing data argument which is dynamic.
  const html = await ejs.renderFile(
    path.join(__dirname, "../mails/password-mail.ejs"),
    data
  );

  //     // sending Email.
  await sendMail(email, {
    subject: "Link For Reseting Your Password.",
    template: "password-mail.ejs",
    data,
    html,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    msg: `Please check your email to reset your passwrod.`,
  });
};

// Reset password.
export const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new NotFoundError("token is expired");
  }

  if (req.body.password !== req.body.confirm_password) {
    throw new BadRequestError("Password and confirm password must be match.");
  }
  // hashing the password for security.
  let hashedPassword = await hashPassword(req.body.password);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "User password updated successfully." });
};
