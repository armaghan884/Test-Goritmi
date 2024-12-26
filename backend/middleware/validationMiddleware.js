import { body, validationResult } from "express-validator";

import { BadRequestError, UnauthorizedError } from "../errors/CustomError.js";

import User from "../models/UserModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("not authorized")) {
          throw new UnauthorizedError("not authorized to access this route");
        }
        throw new BadRequestError(errorMessages);
      }

      next();
    },
  ];
};

// Validating Registeration comming in request
export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
  body("gender").notEmpty().withMessage("gender is required"),
  body("phone").notEmpty().withMessage("Phone no is required"),
]);

// Validating login inputs comming in request
export const validateLoginInput = withValidationErrors([
  body("identifier").notEmpty().withMessage("email or name is required"),
  body("password").notEmpty().withMessage("password is required"),
]);
