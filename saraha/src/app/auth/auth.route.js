import { Router } from "express";

import {
    registerController,
    verifyAccountController,
    sendOTPController,
    loginController,
    loginWithGoogleController
} from "./auth.controller.js";

import { validationMiddleware } from "../../middleware/validation.middleware.js";
import {
    registerDto,
    verifyAccountDto,
    sendOtpDto,
    loginDto,
    loginWithGoogleDto
} from "./auth.dto.js"
export const authRouter = Router()

authRouter.post("/register", validationMiddleware(registerDto), registerController);
authRouter.post("/verify-account", validationMiddleware(verifyAccountDto), verifyAccountController);
authRouter.post("/send-otp", validationMiddleware(sendOtpDto), sendOTPController);
authRouter.post("/login", validationMiddleware(loginDto), loginController);
authRouter.post("/login-with-google", validationMiddleware(loginWithGoogleDto), loginWithGoogleController)


