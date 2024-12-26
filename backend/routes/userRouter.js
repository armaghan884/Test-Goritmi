import { Router } from "express";
import { getUserDetails } from "../controller/userController.js";

const router = Router();

router.get("/", getUserDetails);

export default router;
