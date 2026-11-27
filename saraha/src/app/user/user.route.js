import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { uploadProfilePicture } from "../common/utils/upload.js";
import { uploadProfilePictureController } from "./user.controller.js";

export const userRouter = Router();
userRouter.patch("/profile-picture", authenticate, uploadProfilePicture, uploadProfilePictureController);
